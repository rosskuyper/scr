import Jimp from 'jimp/es'
import temp from 'temp'
import fs from 'fs'

export type ScreenShotBounds = {
    top: number
    left: number
    width: number
    height: number
}

export const cropScreenShot = async (screenshot: Buffer, {top, left, width, height}: ScreenShotBounds): Promise<Buffer> => {
    const image = await Jimp.read(screenshot)

    image.crop(top, left, width, height)

    return image.getBufferAsync(Jimp.MIME_PNG)
}

export type TempFileDetails = {
    path: string
}

export const saveTemp = async (screenshot: Buffer): Promise<TempFileDetails> => {
    return new Promise((resolve, reject) => {
        try {
            const tempPath = temp.path({suffix: '.png'})

            fs.writeFile(tempPath, screenshot, (writeError) => {
                if (writeError) {
                    return reject(writeError)
                }

                resolve({
                    path: tempPath,
                })
            })
        } catch (error) {
            reject(error)
        }
    })
}
