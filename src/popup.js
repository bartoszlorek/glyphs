import React from 'react'
import { render } from 'react-dom'
import { bindEmitter } from './.utils/chrome/execution-counter'
import Popup from './popup/index'

let root = document.createElement('div')
document.body.appendChild(root)

render(<Popup />, root)
bindEmitter()
