import React from 'react'
import table from '../unicode/lookup-table/aglfn'
import { bind } from '../.utils/react-utils'
import filterTable from '../.utils/filter-table'
import isNumeric from '../.utils/is-numeric'
import escNumeric from '../.utils/esc-numeric'

import Glyph from './Glyph'
import bem from './bem'

class App extends React.Component {
    constructor(props) {
        super(props)
        bind(this, [
            'handleSearch'
        ])
        this.state = {
            glyphs: []
        }
    }

    componentWillMount() {
        this.setState({
            glyphs: filterTable(table.glyphs)
        })
    }

    handleSearch({ target }) {
        let { value } = target, spec

        if (isNumeric(value)) {
            spec = {
                value: escNumeric(value)
            }
        } else {
            spec = {
                name: value
            }
        }
        this.setState({
            glyphs: filterTable(
                table.glyphs,
                spec
            )
        })
    }

    render() {
        return (
            <div>
                <input
                    className={bem('search')}
                    onChange={this.handleSearch}
                />
                <div className={bem('container')}>
                    {this.state.glyphs.map((data, index) =>
                        <Glyph key={index} data={data} />
                    )}
                </div>
            </div>
        )
    }
}

export default App
