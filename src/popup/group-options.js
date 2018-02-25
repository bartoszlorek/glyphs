import { categories, blocks } from '../unicode/lookup-table/aglfn'

const mapTable = table => {
    let props = Object.keys(table),
        result = []

    for (let prop of props) {
        result.push({
            label: table[prop],
            value: prop
        })
    }
    return result
}

export default [
    {
        label: 'Category',
        name: 'category',
        options: mapTable(categories)
    },
    {
        label: 'Block',
        name: 'block',
        options: mapTable(blocks)
    }
]
