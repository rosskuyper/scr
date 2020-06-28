import dataUriToBuffer from 'data-uri-to-buffer'
import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import {screenshotDateString} from '../utils/date'
import './index.css'
import {captureFullDesktopScreenshot} from './utils/desktopCapture'
import {showErrorBox} from './utils/error'
import {cropScreenshot} from './utils/image'

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

        fs.writeFileSync(`/Users/ross/Screenshots/scr-${screenshotDateString()}.png`, cropped)
    } catch (error) {
        showErrorBox('Screenshot failed', error.message)
    }
}

const ScreenCapture = (): JSX.Element => {
    return <div id="scr" onClick={takeScreenShot}></div>
}

ReactDOM.render(<ScreenCapture />, document.getElementById('app'))
