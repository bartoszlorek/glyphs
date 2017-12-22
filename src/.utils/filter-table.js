import { mapValues } from 'lodash'

const normalize = value => String(value).toLowerCase()

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
    let normSpec = mapValues(spec, normalize)
    return table.filter(record => {
        let index = length,
            score = length
        while (index--) {
            let prop = props[index],
                value = normalize(record[prop])
            if (value.indexOf(normSpec[prop]) > -1) {
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