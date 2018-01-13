import { isPlainObject, isArray, isFunction } from 'lodash'

const sum = (args, data) => args.reduce((s, f) => s + f(data), 0)

const logicDefault = 'or'
const logic = {
    'and': args => data => sum(args, data) === args.length,
    'or': args => data => sum(args, data) > 0
}

const makePredicate = method => {
    if (!isFunction(method)) {
        throw new Error('makePredicate expected a function')
    }
    return queryObject => {
        if (!isPlainObject(queryObject)) {
            throw new Error(`"${queryObject}" is not a proper query object`)
        }
        const props = Object.keys(queryObject)
        return dataObject => {
            let index = props.length,
                score = index

            while (index--) {
                let prop = props[index]
                if (method(dataObject[prop], queryObject[prop], prop)) {
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

const makeWrapper = predicate => {
    if (!isFunction(predicate)) {
        throw new Error('makeWrapper expected a function to predicate')
    }
    let wrapper, wrap = a => wrapper(a)

    wrapper = query => {
        if (isArray(query)) {
            if (typeof query[0] === 'string') {
                return logic[query[0]](query
                    .slice(1)
                    .map(wrap))
            }
            return logic[logicDefault](query
                .map(wrap))
        }
        return predicate(query)
    }
    return wrapper
}

export {
    makeWrapper,
    makePredicate,
    logic
}

const normalize = value => String(value).toLowerCase()
export default makeWrapper(makePredicate((data, query) => {
    return normalize(data).indexOf(normalize(query)) > -1
}))