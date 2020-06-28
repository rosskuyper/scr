import {AllElectron, ipcRenderer} from 'electron'
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {AreaSelect, DraggedAreaProps} from './components/AreaSelect'
import './index.css'
import {showErrorBox} from './utils/error'
import {takeScreenShot} from './utils/screen'

const closeWindow = (): void => {
    const {remote}: AllElectron = require('electron')

    remote.getCurrentWindow().close()
}

const ScreenCapture = (): JSX.Element => {
    const [showAreaSelect, setShowAreaSelect] = useState(true)

    const onAreaSelected = async (bounds: DraggedAreaProps) => {
        // Let's only do this once
        setShowAreaSelect(false)

        try {
            const image = await takeScreenShot(bounds)

            ipcRenderer.send('screenshot.captured', {
                image,
            })

            closeWindow()
        } catch (error) {
            showErrorBox('Screenshot failed', error.message)
            closeWindow()
        }
    }

    return <div id="scr">{showAreaSelect && <AreaSelect onAreaSelected={onAreaSelected} />}</div>
}

ReactDOM.render(<ScreenCapture />, document.getElementById('app'))
