import scriptableTab from './.utils/chrome/scriptable-tab'
import { createCounter, bindListener } from './.utils/chrome/execution-counter'
import message from './.utils/chrome/message'

const script = scriptableTab()
const counter = createCounter(bindListener({}))

const alertError = () => alert('This tab cannot be scripted.')
const executeTab = id => counter(id)
    .equal(0, () =>
        chrome.tabs.executeScript(id, {
            file: 'popup.js'
        })
    )
    .greater(0, () =>
        message.toTab.one(id, {
            type: 'BROWSER_ACTION'
        })
    )

chrome.browserAction.onClicked.addListener(tab =>
    script(tab.id)
        .then(executeTab)
        .catch(alertError)
)
