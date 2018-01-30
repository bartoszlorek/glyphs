import { categories, blocks } from '../unicode/lookup-table/aglfn'

const option = prefix => (name, index) => ({
    value: `${prefix}.${index}`,
    label: name,
    index
})

export default [
    {
        label: 'Category',
        name: 'category',
        options: categories.map(option('c'))
    },
    {
        label: 'Block',
        name: 'block',
        options: blocks.map(option('b'))
    }
]
