import {dialog, ipcMain} from 'electron'
import {DialogShowErrorBoxChannel, DialogErrorBoxMessage} from '../../utils/ipcMessaging'

/**
 * Add IPC listeners to let our render processes perform some actions only available to the main thread
 */
export const registerMessagingListeners = (): void => {
    // Error dialogs
    ipcMain.on(DialogShowErrorBoxChannel, (_event, message: DialogErrorBoxMessage) => {
        dialog.showErrorBox(message.title, message.content)
    })
}
