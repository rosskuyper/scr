import dataUriToBuffer from 'data-uri-to-buffer'
import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import {screenshotDateString} from '../utils/date'
import './index.css'
import {captureFullDesktopScreenshot} from './utils/desktopCapture'
import {showErrorBox} from './utils/error'

const takeScreenShot = async (): Promise<void> => {
    try {
        const screenshot = await captureFullDesktopScreenshot()

        fs.writeFileSync(`/Users/ross/Screenshots/scr-${screenshotDateString()}.png`, dataUriToBuffer(screenshot))
    } catch (error) {
        showErrorBox('Screenshot failed', error.message)
    }
}

const ScreenCapture = (): JSX.Element => {
    return <div id="scr" onClick={takeScreenShot}></div>
}

ReactDOM.render(<ScreenCapture />, document.getElementById('app'))
