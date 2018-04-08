import React from 'react'
import { render } from 'react-dom'
import { bindTabEmitter } from './.utils/chrome/execution-counter'
import Popup from './popup/index'

let root = document.createElement('div')
document.body.appendChild(root)

render(<Popup />, root)
bindTabEmitter()
