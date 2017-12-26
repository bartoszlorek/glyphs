import React from 'react'
import table from '../unicode/lookup-table/aglfn'
import { bind } from '../.utils/react-utils'
import filterTable from '../.utils/filter-table'

import Glyph from './Glyph'
import bem from './bem'

class App extends React.Component {
    constructor(props) {
        super(props)
        bind(this, [
            'handleSearch'
        ])
        this.state = {
            glyphs: [],
            value: ''
        }
    }

    componentWillMount() {
        this.setState({
            glyphs: filterTable(table.glyphs)
        })
    }

    handleSearch({ target }) {
        this.setState({
            glyphs: filterTable(table.glyphs, {
                name: target.value
            })
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