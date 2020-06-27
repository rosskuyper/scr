export type Lock = {
    getLock: () => boolean
    unlock: () => void
}

export const createLock = (): Lock => {
    let lock = false

    const getLock = (): boolean => {
        if (lock) {
            return false
        }

        lock = true

        return true
    }

    const unlock = (): void => {
        lock = false
    }

    return {
        getLock,
        unlock,
    }
}
