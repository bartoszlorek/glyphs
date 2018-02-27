import { groups } from '../unicode/lookup-table/aglfn-gg'
import { icontains } from '../.utils/predicates'
import { pickBy } from 'lodash'

const glyphIn = codes => ({ group }) => {
    return codes.some(code => group.indexOf(code) >= 0)
}

function groupContainsValue(value = '') {
    if (value === '') {
        return () => true
    }
    const matchedGroupCodes = Object.keys(
        pickBy(groups, icontains(value)))
    return glyphIn(matchedGroupCodes)
}

function groupContainsArray(array = []) {
    if (array.length === 0) {
        return () => true
    }
    const matchedGroupCodes = array.map(
        group => group.value)
    return glyphIn(matchedGroupCodes)
}

export {
    groupContainsValue,
    groupContainsArray
}
