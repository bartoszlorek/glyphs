/* based on https://codepen.io/Universalist/post/predicates-in-javascript */

// Logical Operators
const and = (...args) => x => args.every(a => a(x))
const or = (...args) => x => args.some(a => a(x))
const not = a => x => !a(x)

// Comparison Operators
const greater = x => y => y > x
const less = x => y => y < x

const greaterEqual = x => y => y >= x
const lessEqual = x => y => y <= x

const positive = x => x > 0
const negative = x => x < 0

// Data Operators
const object = {
    has: key => obj => obj.hasOwnProperty(key),
    equal: (key, value) => obj => obj[key] === value,
    contain: (key, value) => obj => {
        return String(obj[key]).indexOf(value) > -1
    },
    icontain: (key, value) => {
        value = String(value).toLowerCase()
        return obj =>
            String(obj[key])
                .toLowerCase()
                .indexOf(value) > -1
    }
}

const array = {
    has: value => item => item === value,
    contain: value => item => {
        return String(item).indexOf(value) > -1
    },
    icontain: value => {
        value = String(value).toLowerCase()
        return item =>
            String(item)
                .toLowerCase()
                .indexOf(value) > -1
    }
}

export default {
    and,
    or,
    not,
    greater,
    less,
    greaterEqual,
    lessEqual,
    positive,
    negative,
    object,
    array
}

export {
    and,
    or,
    not,
    greater,
    less,
    greaterEqual,
    lessEqual,
    positive,
    negative,
    object,
    array
}
