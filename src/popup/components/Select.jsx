import React from 'react'
import SelectPlus from 'react-select-plus'

import './react-select-plus.css'

function Select(props) {
    return <SelectPlus {...props} multi={true} />
}

export default Select
