import React from 'react'
import ReactDOM from 'react-dom'

// Import the styles here to process them with webpack
import './index.css'

const takeScreenShot = async (): Promise<void> => {
    // Has to be required during the process
    const { desktopCapturer } = require('electron')

    // Get the sources
    const sources = await desktopCapturer.getSources({types: ['window', 'screen']})

    // todo - get entire screen and capture a sub section of it
    console.log('sources', sources)
}

const ScreenCapture = (): JSX.Element => {
    return <div id="scr" onClick={takeScreenShot}>Hello</div>
}

ReactDOM.render(<ScreenCapture />, document.getElementById('app'))
