import React from 'react'
import SelectPlus from 'react-select-plus'

import './react-select-plus.css'

function Select({ value, options, onChange }) {
    return (
        <SelectPlus
            multi={true}
            value={value}
            options={options}
            onChange={onChange}
        />
    )
}

export default Select
