import React from 'react'
import SelectPlus from 'react-select-plus'

import '../select-plus-style/select.less'

function Select(props) {
    return <SelectPlus {...props} multi={true} searchable={false} />
}

export default Select
