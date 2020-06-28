import dataUriToBuffer from 'data-uri-to-buffer'
import {captureFullDesktopScreenshot} from './desktopCapture'
import {cropScreenShot, ScreenShotBounds} from './image'

export const takeScreenShot = async (bounds: ScreenShotBounds): Promise<Buffer> => {
    const screenShot = await captureFullDesktopScreenshot()

    const screenShotBuffer = dataUriToBuffer(screenShot)

    const croppedImage = await cropScreenShot(screenShotBuffer, bounds)

    return croppedImage
}
