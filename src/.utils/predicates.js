/* based on https://codepen.io/Universalist/post/predicates-in-javascript
 * motivation: convenient queries (predicates) system for filtering object literal dataset
 * alternative: https://github.com/landau/predicate
 */

// Logical Operators
const and = (...args) => x => args.every(a => a(x))
const or = (...args) => x => args.some(a => a(x))
const not = a => x => !a(x)

// Comparison Operators
const greater = x => y => y > x
const less = x => y => y < x

const greaterEqual = x => y => y >= x
const lessEqual = x => y => y <= x
const between = (x, y) => and(greaterEqual(x), lessEqual(y))

const positive = x => x > 0
const negative = x => x < 0

const equal = x => y => x === y
const contains = x => str => String(str).indexOf(x) > -1

const icontains = x => {
    x = String(x).toLowerCase()
    return str => String(str)
        .toLowerCase()
        .indexOf(x) > -1
}

// Data Operators
const object = {
    has: (...keys) => obj => keys.every(k => obj.hasOwnProperty(k)),
    equal: (key, x) => obj => equal(x)(obj[key]),
    contains: (key, x) => obj => contains(x)(obj[key]),
    icontains: (key, x) => obj => icontains(x)(obj[key]),
    is: (key, fn) => obj => fn(obj[key])
}

export default {
    and,
    or,
    not,
    greater,
    less,
    greaterEqual,
    lessEqual,
    between,
    positive,
    negative,
    equal,
    contains,
    icontains,
    object
}

export {
    and,
    or,
    not,
    greater,
    less,
    greaterEqual,
    lessEqual,
    between,
    positive,
    negative,
    equal,
    contains,
    icontains,
    object
}
