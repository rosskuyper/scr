export const createLock = () => {
  let lock = false

  const getLock = () => {
    if (lock) {
      return false
    }

    lock = true

    return true
  }

  const unlock = () => {
    lock = false
  }

  return {
    getLock,
    unlock,
  }
}
