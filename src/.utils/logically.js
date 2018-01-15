import { isPlainObject, isArray, isFunction, mapValues } from 'lodash'

const DEFAULT_OPERATOR = 'or'

const sum = (args, data) => args.reduce((s, f) => s + f(data), 0)
const operators = {
    'and': args => data => sum(args, data) === args.length,
    'or': args => data => sum(args, data) > 0
}

function makePredicate(compare, normalize) {
    if (!isFunction(compare)) {
        throw new Error('makePredicate expects a function')
    }
    return (queryObject) => {
        if (!isPlainObject(queryObject)) {
            throw new Error(`"${queryObject}" is not a proper query object`)
        }
        if (normalize != null) {
            if (!isFunction(normalize)) {
                throw new Error('makePredicate expects normalize as a function')
            }
            queryObject = mapValues(queryObject, normalize)
        }

        const props = Object.keys(queryObject)
        return (dataObject) => {
            let index = props.length,
                score = index

            while (index--) {
                let prop = props[index],
                    data = dataObject[prop]

                if (normalize != null) {
                    data = normalize(data)
                }
                if (compare(data, queryObject[prop], prop)) {
                    score -= 1
                }
                if (index < score) {
                    return false
                }
            }
            return true
        }
    }
}

function wrapQuery(wrap, query) {
    let operator = query[0]

    if (typeof operator !== 'string') {
        return operators[DEFAULT_OPERATOR](query.map(wrap))
    }
    if (operators[operator] === undefined) {
        throw new Error(`"${operator}" is not a registered logical operator`)
    }
    return operators[operator](query.slice(1).map(wrap))
}

function makeWrapper(predicate) {
    if (!isFunction(predicate)) {
        throw new Error('makeWrapper expects a function to predicate')
    }
    let wrapper,
        wrap = a => wrapper(a)

    return wrapper = query => {
        if (isArray(query)) {
            return wrapQuery(wrap, query)
        }
        return predicate(query)
    }
}

export {
    makeWrapper,
    makePredicate,
    operators
}

const normalize = value => String(value).toLowerCase()
export default makeWrapper(makePredicate((data, query) => {
    return normalize(data).indexOf(normalize(query)) > -1
}))