/* based on https://codepen.io/Universalist/post/predicates-in-javascript
 * need more? https://github.com/landau/predicate
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

const positive = x => x > 0
const negative = x => x < 0

const equal = x => y => x === y
const contain = x => source => String(source).indexOf(x) > -1

const icontain = x => {
    x = String(x).toLowerCase()
    return source =>
        String(source)
            .toLowerCase()
            .indexOf(x) > -1
}

// Data Operators
const object = {
    has: key => obj => obj.hasOwnProperty(key),
    equal: (key, x) => obj => equal(x)(obj[key]),
    contain: (key, x) => obj => contain(x)(obj[key]),
    icontain: (key, x) => obj => icontain(x)(obj[key]),
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
    positive,
    negative,
    equal,
    contain,
    icontain,
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
    positive,
    negative,
    equal,
    contain,
    icontain,
    object
}
