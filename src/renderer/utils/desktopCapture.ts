import {find} from 'lodash'
import {AllElectron, DesktopCapturerSource} from 'electron'

const getMainScreen = async (): Promise<DesktopCapturerSource> => {
    // Has to be required during the process
    const {desktopCapturer}: AllElectron = require('electron')

    // Get the sources
    const sources = await desktopCapturer.getSources({types: ['window', 'screen']})

    // Electron identifies the full source by its name
    const screen = find(sources, (source: DesktopCapturerSource): boolean => {
        return source.name === 'Entire Screen'
    })

    if (!screen) {
        throw new Error('Could not find main screen')
    }

    return screen
}

type MediaStreamDetails = {
    stream: MediaStream
    width: number
    height: number
}

/**
 * Inserts a canvas into the browser window and uses that to parse the stream provided by getUserMedia()
 */
const getImageUrlFromStream = async ({stream, width, height}: MediaStreamDetails): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            // Create hidden video tag
            const video = document.createElement('video')
            video.style.cssText = 'position:absolute;top:-10000px;left:-10000px;'

            video.onloadedmetadata = function () {
                video.style.height = `${width}px`
                video.style.width = `${height}px`

                video.play()

                // Create canvas
                const canvas = document.createElement('canvas')
                canvas.width = width
                canvas.height = height

                const ctx = canvas.getContext('2d')

                if (!ctx) {
                    throw new Error('Could not create context for canvas')
                }

                // Draw video on canvas
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

                // send this somewhere
                const image = canvas.toDataURL('image/png', 100)

                // Remove hidden video tag
                video.remove()

                try {
                    // Destroy connect to stream
                    stream.getTracks()[0].stop()
                } catch {
                    // Intentionally empty
                }

                resolve(image)
            }

            video.srcObject = stream
            document.body.appendChild(video)
        } catch (error) {
            reject(error)
        }
    })
}

export const captureFullDesktopScreenshot = async (): Promise<string> => {
    // Has to be required during the process
    const {remote}: AllElectron = require('electron')

    // The size of the screen recording will be the full size of the display
    const {size: {width, height}} = remote.screen.getPrimaryDisplay()

    // Step 1 - get the entire screen
    const mainScreen = await getMainScreen()

    // Step 2 - get a stream from that screen
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            // @ts-ignore the electron implementation differs from the offial libs
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: mainScreen.id,
                minWidth: width,
                maxWidth: width,
                minHeight: height,
                maxHeight: height,
            },
        },
    })

    // Step 3 - get an image from that stream
    return getImageUrlFromStream({
        stream,
        width,
        height,
    })
}
