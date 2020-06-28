import {Tray, Menu, nativeImage, NativeImage} from 'electron'
import {TRAY_ICON, ACCELERATOR_SCREENSHOT} from '../config'
import {openScreenshotWindow} from './screenCapture'

// This arg should be optional but the type defs require it
const HSL_NO_SHIFT = [
    -1, // hue. 0 and 1 map to 0 and 360 on the hue color wheel. -1 seems to leave the icon unchanged.
    0.5, // saturation. 0 = remove all color. 0.5 = leave unchanged. 1 = fully saturate the image.
    0.5, // lightness. 0 = remove all lightness. 0.5 = leave unchanged. 1 = full lightness
]

// These make sense as singletons because we only ever want one
let tray: Tray
let contextMenu: Menu

// The system green dot icon
// https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/
const getMacOSAvailableIcon = (): NativeImage => {
    const icon = nativeImage.createFromNamedImage('NSStatusAvailable', HSL_NO_SHIFT)

    // Resize the icon because by default it renders far too large
    return icon.resize({
        width: 18,
        height: 18,
        quality: 'best',
    })
}

// Just to keep initTray neat and tidy
const constructTray = (): void => {
    tray = new Tray(TRAY_ICON)

    contextMenu = Menu.buildFromTemplate([
        {
            label: 'Scr agent running',
            type: 'normal',
            enabled: false,
            icon: getMacOSAvailableIcon(),
        },
        {
            type: 'separator',
        },
        {
            label: 'Take screenshot',
            type: 'normal',
            accelerator: ACCELERATOR_SCREENSHOT,
            click: openScreenshotWindow,
        },
        {
            label: 'Quit',
            role: 'quit',
        },
    ])

    tray.setContextMenu(contextMenu)
}

type ScreenCropperTrayMenu = {
    tray: Tray
    contextMenu: Menu
}

export const initTray = (): ScreenCropperTrayMenu => {
    if (!tray) {
        constructTray()
    }

    // At this point the tray and its menu are registered and visible to the user
    return {
        tray,
        contextMenu,
    }
}
