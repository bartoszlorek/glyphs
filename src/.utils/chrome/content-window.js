function escStyle(object) {
    if (object == null) {
        return ''
    }
    let props = Object.keys(object),
        length = props.length,
        index = -1,
        result = ''

    while (length--) {
        let prop = props[++index]
        result += `${prop}:${object[prop]};`
    }
    return result
}

function contentWindow(tabId, path) {
    console.log(tabId, path)

    const frameStyle = escStyle({
        width: '100%',
        height: '100%'
    })

    const wrapStyle = escStyle({
        '-webkit-overflow-scrolling': 'touch',
        'z-index': 99999,
        overflow: 'auto',
        position: 'fixed',
        background: '#fff',
        right: '10px',
        top: '10px',
        width: '400px',
        height: '400px'
    })

    chrome.tabs.executeScript(
        tabId,
        {
            code: `let frame = document.createElement('iframe')
            frame.src = chrome.extension.getURL('${path}')
            frame.setAttribute('style', '${frameStyle}')
            let wrap = document.createElement('div')
            wrap.setAttribute('style', '${wrapStyle}')
            wrap.appendChild(frame)
            document.body.appendChild(wrap)`
        },
        () => {
            console.log('done')
        }
    )
}

export default contentWindow
