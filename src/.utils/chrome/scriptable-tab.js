const VOID = { code: 'void(0)' }

function scriptableTab() {
    const state = {}

    return tabId => {
        if (typeof tabId !== 'number') {
            return Promise.reject('Incorrect tab ID.')
        }
        let tabState = state[tabId]
        if (tabState !== undefined) {
            return tabState === true
                ? Promise.resolve(tabId)
                : Promise.reject(tabState)
        }

        return new Promise((resolve, reject) =>
            chrome.tabs.executeScript(tabId, VOID, () => {
                let { lastError } = chrome.runtime

                if (lastError) {
                    state[tabId] = lastError.message
                    reject(lastError.message)
                } else {
                    state[tabId] = true
                    resolve(tabId)
                }
            })
        )
    }
}

export default scriptableTab
