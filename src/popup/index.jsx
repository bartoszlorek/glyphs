import React from 'react'
import { bind } from '../.utils/react-utils'
import { and, or, object } from '../.utils/predicates'
import { glyphs } from '../unicode/lookup-table/aglfn'
import message from '../.utils/chrome/message'

import Container from './components/Container'
import Select from './components/Select'
import bem from './bem'

import groupOptions from './group-options'
import groupContains from './group-contains'

class Popup extends React.Component {
    constructor(props) {
        super(props)
        bind(this, ['handleSearch', 'handleSelect', 'handleClick'])

        this.state = {
            searchValue: '',
            selectGroup: []
        }
    }

    handleSearch({ target }) {
        this.setState({
            searchValue: target.value
        })
    }

    handleSelect(selection) {
        this.setState({
            selectGroup: selection
        })
    }

    handleClick(glyph) {
        message.toTab.current({ type: 'ADD_GLYPH', glyph })
    }

    render() {
        const { selectGroup, searchValue } = this.state
        const visibleGlyphs = glyphs.filter(
            and(
                or(
                    object.icontains('value', searchValue),
                    object.icontains('name', searchValue)
                ),
                or(
                    groupContains('category', selectGroup),
                    groupContains('block', selectGroup)
                )
            )
        )

        return (
            <div>
                <input className={bem('search')} onChange={this.handleSearch} />
                <Select
                    value={selectGroup}
                    options={groupOptions}
                    onChange={this.handleSelect}
                />
                <Container glyphs={visibleGlyphs} onClick={this.handleClick} />
            </div>
        )
    }
}

export default Popup
