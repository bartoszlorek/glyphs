function groupContains(name, selection) {
    if (selection.length === 0) {
        return () => true
    }
    const current = selection.filter(a => a.group.name === name)
    return obj => current.some(a => a.index === obj[name])
}

export default groupContains
