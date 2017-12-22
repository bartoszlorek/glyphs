import { mapValues } from 'lodash'

function filterTable(table, spec) {
    if (table == null) {
        return []
    }
    if (spec == null) {
        return table
    }
    let props = Object.keys(spec),
        length = props.length
    if (length < 0) {
        return table
    }
    let lowerSpec = mapValues(spec, value =>
        value.toLowerCase())

    return table.filter(record => {
        let index = length,
            score = length
        while (index--) {
            let prop = props[index],
                value = record[prop].toLowerCase()
            if (value.indexOf(lowerSpec[prop]) > -1) {
                score -= 1
            }
            if (index < score) {
                return false
            }
        }
        return true
    })
}

export default filterTable