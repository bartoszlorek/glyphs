import message from './.utils/chrome/message'
import executableTab from './.utils/chrome/executable-tab'
import {
    createCounter,
    bindBackListener
} from './.utils/chrome/execution-counter'

const exec = executableTab()
const counter = createCounter(bindBackListener())

const alertError = () => alert('This tab cannot be scripted.')
const executeTab = id => counter(id)
    .equal(0, () =>
        chrome.tabs.executeScript(id, {
            file: 'popup.js'
        })
    )
    .greater(0, () =>
        message.toTab(id, {
            type: 'BROWSER_ACTION'
        })
    )

chrome.browserAction.onClicked.addListener(tab =>
    exec(tab)
        .then(executeTab)
        .catch(alertError)
)
