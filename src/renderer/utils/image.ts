import Jimp from 'jimp/es'

export type Bounds = {
    x: number
    y: number
    w: number
    h: number
}

export const cropScreenshot = async (screenshot: Buffer, bounds: Bounds): Promise<Buffer> => {
    const image = await Jimp.read(screenshot)

    const {x, y, w, h} = bounds

    image.crop(x, y, w, h)

    return image.getBufferAsync(Jimp.MIME_PNG)
}
