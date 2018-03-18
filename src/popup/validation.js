import matchProperty from '../.utils/match-property'

const blacklist = {
    'facebook.com': 'Facebook Messenger/Posts'
}

const result = error => ({
    failed: error !== '',
    error
})

function validation(range) {
    if (range == null) {
        return result(
            'The requested element is unavailable, probably located in a different domain (Cross-Domain Policy).'
        )
    }

    let container = range.commonAncestorContainer

    // bug: Adding Glyph to the empty textarea in (commonly used)
    // Facebook Messenger. Origin of this bug is in adding new child
    // to the React Element, not modifying an existing one.
    if (range.collapsed && container.children && container.children.length) {
        let name = matchProperty(location.hostname, blacklist)
        if (name !== null) {
            return result(
                `There is a limitation which mainly occurs in ${name}. Adding Glyph to the empty textarea causes an error. Write something and then add Glyph. Sorry for the inconvenience.`
            )
        }
    }

    return result('')
}

export default validation
