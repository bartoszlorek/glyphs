import getPrototypeBy from './get-prototype-by'

const setNative = property => {
    const getDescriptor = element => {
        return Object.getOwnPropertyDescriptor(element, property)
    }
    const withDescriptor = getPrototypeBy(
        element => getDescriptor(element) !== undefined
    )

    return (element, value) => {
        let prototype = withDescriptor(element)
        if (prototype == null) {
            return false
        }
        let setter = getDescriptor(prototype).set
        setter.call(element, value)
        return true
    }
}

const setValue = setNative('value')
const setTextContent = setNative('textContent')

export {
    setValue,
    setTextContent
}
