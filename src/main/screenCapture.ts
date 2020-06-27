import { screen, BrowserWindow } from 'electron'
import { createLock } from '../utils/lock'
declare const MAIN_WINDOW_WEBPACK_ENTRY: string

// Some weird ui + shortcut interactions can lead to this being called multiple times
const { getLock, unlock } = createLock()

export const openScreenshotWindow = (): void => {
  // Check lock
  if (!getLock()) return

  // Create a transparent browser window the full size of the page
  const { workAreaSize } = screen.getPrimaryDisplay()

  // Create a full-page transparent window where we can show the crop cursor etc
  const win = new BrowserWindow({
    ...workAreaSize,
    x: 0,
    y: 0,
    frame: false,
    transparent: true,
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

  win.webContents.openDevTools()
}
