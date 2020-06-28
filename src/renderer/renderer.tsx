import {format} from 'date-fns'
import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {captureFullDesktopScreenshot} from './utils/desktopCapture'
import {showErrorBox} from './utils/error'

const scrDate = (): string => {
    const now = new Date()

    return `${format(now, 'yyyy-mm-dd')} at ${format(now, 'HH:mm:ss')}`
}

const takeScreenShot = async (): Promise<void> => {
    try {
        const screenshot = await captureFullDesktopScreenshot()

        console.log(screenshot.slice(0, 50))

        fs.writeFileSync(`/Users/ross/Screenshots/scr-${scrDate()}.png`, screenshot)
    } catch (error) {
        showErrorBox('Screenshot failed', error.message)
    }
}

const ScreenCapture = (): JSX.Element => {
    return <div id="scr" onClick={takeScreenShot}></div>
}

ReactDOM.render(<ScreenCapture />, document.getElementById('app'))
