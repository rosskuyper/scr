import {screen, BrowserWindow, systemPreferences, dialog} from 'electron'
import {createLock} from '../../utils/lock'

// electron-forge gives us the correct path to our renderer
declare const MAIN_WINDOW_WEBPACK_ENTRY: string

// Some weird ui + shortcut interactions can lead to this being called multiple times
const {getLock, unlock} = createLock()

/**
 * Check whether we have permission to capture the user's screen
 */
const hasScreenPermissions = (): boolean => {
    const access = systemPreferences.getMediaAccessStatus('screen')

    return access === 'granted'
}

/**
 * Tell the user to allow access in system preferences
 */
const showAccessErrorDialogue = (): void => {
    dialog.showErrorBox(
        'Screen Recording Access Required',
        `To allow access to take screenshots please grant "Screen Recording" access in System Preferences under "Privacy"`,
    )
}

/**
 * Configure and open the screen cpature BrowserWindow
 */
const openBrowserWindow = (): void => {
    // Create a transparent browser window the full size of the page
    const {workAreaSize} = screen.getPrimaryDisplay()

    // Create a full-page transparent window where we can show the crop cursor etc
    const win = new BrowserWindow({
        ...workAreaSize,
        x: 0,
        y: 0,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
    })

    const end = (): void => {
        win.close()
        unlock()
    }

    // If the user alt-tabs or similar, just end the screencap
    win.on('blur', end)
    win.on('hide', end)
    win.on('minimize', end)

    // load the page
    win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    // todo remove for final build
    // win.webContents.openDevTools()
}

/**
 * If possible, open the window that will handle taking the screenshot
 */
export const openScreenshotWindow = (): void => {
    // Check lock
    if (!getLock()) return

    // Check whether we can take screenshots
    if (!hasScreenPermissions()) {
        /**
         * If this were used in different contexts it might be prudent to make
         * the calling code responsible for telling the user.
         */
        showAccessErrorDialogue()

        return
    }

    // Open the electron browser window / renderer responsible for taking the screenshot
    openBrowserWindow()
}
