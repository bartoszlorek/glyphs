import { groups } from '../unicode/lookup-tables/aglfn-gg'

const options = Object.keys(groups).map(prop => ({
    label: groups[prop],
    value: prop
}))

export default options
