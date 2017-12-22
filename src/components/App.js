import React from 'react'
import table from '../unicode/lookup-table/aglfn'
import { bind } from '../.utils/react-utils'
import filterTable from '../.utils/filter-table'

import Glyph from './Glyph'
import style from './style.css'

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

    handleSearch(e) {
        this.setState({
            glyphs: filterTable(table.glyphs, {
                name: e.target.value
            })
        })
    }

    render() {
        return (
            <div>
                <input
                    type='text'
                    onChange={this.handleSearch}
                />
                <div className={style.container}>
                    {this.state.glyphs.map((data, index) =>
                        <Glyph key={index} data={data} />
                    )}
                </div>
            </div>
        )
    }
}

export default App