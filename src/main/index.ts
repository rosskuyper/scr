/**
 * Entry point of the Election app.
 */
import {app, globalShortcut, ipcMain} from 'electron'
import {openScreenshotWindow} from './components/screenCapture'
import {initTray} from './components/tray'
import {ACCELERATOR_SCREENSHOT} from './config'

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    // Register the screenshot listener. When we're told about a captured screenshot we'll upload it to S3.
    ipcMain.on('screenshot.captured', (_event, message) => {
        console.log(message.image.length)
    })

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
