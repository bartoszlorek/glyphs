import { groups } from '../unicode/lookup-table/aglfn-gg'

const options = Object.keys(groups).map(prop => ({
    label: groups[prop],
    value: prop
}))

export default options
