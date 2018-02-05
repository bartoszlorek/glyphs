import React from 'react'
import SelectPlus from 'react-select-plus'
import bem from '../bem'

import 'react-select-plus/dist/react-select-plus.css'

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
