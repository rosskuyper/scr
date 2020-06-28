import {AllElectron} from 'electron'

/**
 * Send a message over ipc
 */
export const showErrorBox = (title: string, content: string) => {
    const {remote}: AllElectron = require('electron')

    remote.dialog.showErrorBox(title, content)
}
