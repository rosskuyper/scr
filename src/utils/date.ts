import {format} from 'date-fns'

export const screenshotDateString = (): string => {
    const now = new Date()

    return `${format(now, 'yyyy-mm-dd')} at ${format(now, 'HH.mm.ss')}`
}
