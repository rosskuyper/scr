/**
 * Entry point of the Election app.
 */
import {app, globalShortcut} from 'electron'
import {ACCELERATOR_SCREENSHOT} from './config'
import {initTray} from './tray'
import {openScreenshotWindow} from './screenCapture'

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    // Register the tray and its menu
    initTray()

    // Hide the dock icon, this app runs behind the scenes
    app.dock.hide()

    // Register a global shortcut to init the screenshot process
    globalShortcut.register(ACCELERATOR_SCREENSHOT, () => {
        openScreenshotWindow()
    })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
