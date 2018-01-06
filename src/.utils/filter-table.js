import { mapValues, isArray, isPlainObject } from 'lodash'

const makeResolve = compare => (data, value) => {
    let props = Object.keys(value),
        index = props.length,
        score = index

    while (index--) {
        let prop = props[index]
        if (compare(data[prop], value[prop], prop)) {
            score -= 1
        }
        if (index < score) {
            return false
        }
    }
    return true
}

const logicalTest = (data, value, func) => {
    let operator = 'or'
    if (typeof value[0] === 'string') {
        operator = value[0]
        value = value.slice(1)
    }
    let length = value.length,
        result = value
        .map(item => +baseFilter(data, item))
        .reduce((a, b) => a + b, 0)

    if (operator === 'or') {
        return result > 0
    }
    if (operator === 'and') {
        return result === length
    }
}

const normalize = value => String(value).toLowerCase()
const resolve = makeResolve((data, query) => {
    return normalize(data).indexOf(normalize(query)) > -1
})

function baseFilter(data, value) {
    if (isPlainObject(value)) {
        return resolve(data, value)
    }
    if (isArray(value)) {
        return logicalTest(data, value, baseFilter)
    }
    return false
}

function filterTable(table, query) {
    if (table == null) {
        return []
    }
    if (query == null) {
        return table
    }
    return table.filter(data =>
        baseFilter(data, query)
    )
}

export default filterTable