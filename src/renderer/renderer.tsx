import dataUriToBuffer from 'data-uri-to-buffer'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {captureFullDesktopScreenshot} from './utils/desktopCapture'
import {showErrorBox} from './utils/error'
import {cropScreenshot} from './utils/image'
import {saveImage} from './utils/aws'

const takeScreenShot = async (): Promise<void> => {
    try {
        const screenshot = await captureFullDesktopScreenshot()

        const bounds = {
            x: 100,
            y: 100,
            w: 450,
            h: 450,
        }

        const cropped = await cropScreenshot(dataUriToBuffer(screenshot), bounds)



        const result = await saveImage(cropped)
    } catch (error) {
        showErrorBox('Screenshot failed', error.message)
    }
}

const ScreenCapture = (): JSX.Element => {
    return <div id="scr" onClick={takeScreenShot}></div>
}

ReactDOM.render(<ScreenCapture />, document.getElementById('app'))
