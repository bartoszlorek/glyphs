function groupContains(name, selectedGroups) {
    if (selectedGroups.length === 0) {
        return () => true
    }
    const currentGroups = selectedGroups.filter(
        item => item.group.name === name
    )
    return glyph => currentGroups.some(
        group => group.index === glyph[name]
    )
}

export default groupContains
