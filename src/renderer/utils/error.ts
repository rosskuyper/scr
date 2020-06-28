import {AllElectron} from 'electron'
import { DialogShowErrorBoxChannel } from '../../utils/ipcMessaging'

/**
 * Send a message over ipc
 */
export const showErrorBox = (title: string, content: string) => {
    const {ipcRenderer}: AllElectron = require('electron')

    // The main thread will then action this
    ipcRenderer.send(DialogShowErrorBoxChannel, {
        title,
        content,
    })
}
