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

function groupContainsValue(groupName, value = '') {
    if (value === '') {
        return () => true
    }
    let matchedGroupValues = Object.keys(
        pickBy(tables[groupName], icontains(value)))
    return inGroup(groupName, matchedGroupValues)
}

function groupContainsArray(groupName, array = []) {
    if (array.length === 0) {
        return () => true
    }
    let matchedGroupValues = array.map(group => group.value)
    return inGroup(groupName, matchedGroupValues)
}

export {
    groupContainsValue,
    groupContainsArray
}
