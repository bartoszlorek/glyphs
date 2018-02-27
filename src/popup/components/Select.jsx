import React from 'react'
import SelectPlus from 'react-select-plus'

import '../select-style/select.less'

function Select(props) {
    return <SelectPlus {...props} multi={true} searchable={false} />
}

export default Select
