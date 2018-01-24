import React from 'react'
import table from '../unicode/lookup-table/aglfn'
import { bind } from '../.utils/react-utils'
import { or, object } from '../.utils/predicates'

import Glyph from './Glyph'
import bem from './bem'

class App extends React.Component {
    constructor(props) {
        super(props)
        bind(this, ['handleSearch'])
        this.state = {
            glyphs: table.glyphs
        }
    }

    handleSearch({ target }) {
        let { value } = target
        this.setState({
            glyphs: table.glyphs.filter(or(
                object.icontains('value', value),
                object.icontains('name', value)
            ))
        })
    }

    render() {
        return (
            <div>
                <input className={bem('search')} onChange={this.handleSearch} />
                <div className={bem('container')}>
                    {this.state.glyphs.map((data, index) => (
                        <Glyph key={index} data={data} />
                    ))}
                </div>
            </div>
        )
    }
}

export default App
