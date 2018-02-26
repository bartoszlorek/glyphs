import { categories, blocks } from '../unicode/lookup-table/aglfn'
import { icontains } from '../.utils/predicates'
import { pickBy } from 'lodash'

const tables = {
    category: categories,
    block: blocks
}

const inGroup = (name, values) => glyph => {
    return values.indexOf(glyph[name]) > -1
}

function groupByString(groupName, string = '') {
    if (string === '') {
        return () => true
    }
    let matchedValues = Object.keys(
        pickBy(tables[groupName], icontains(string))
    )
    return inGroup(groupName, matchedValues)
}

function groupByArray(groupName, selected = []) {
    if (selected.length === 0) {
        return () => true
    }
    let matchedValues = selected.map(group => group.value)
    return inGroup(groupName, matchedValues)
}

export {
    groupByString,
    groupByArray
}
