import getPrototypeBy from './get-prototype-by'

const setNative = property => {
    const getDescriptor = element => {
        return Object.getOwnPropertyDescriptor(element, property)
    }
    const protoWithDescriptor = getPrototypeBy(
        element => getDescriptor(element) !== undefined
    )

    return (element, value) => {
        let prototype = protoWithDescriptor(element)
        if (prototype == null) {
            return false
        }
        let setter = getDescriptor(prototype).set
        setter.call(element, value)
        return true
    }
}

export const setNativeValue = setNative('value')
export const setNativeNodeValue = setNative('nodeValue')
export const setNativeTextContent = setNative('textContent')

export default setNative
