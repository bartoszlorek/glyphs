import React from 'react'
import { bind } from '../.utils/react-utils'
import { and, or, object } from '../.utils/predicates'
import { glyphs } from '../unicode/lookup-table/aglfn'
import message from '../.utils/chrome/message'

import Frame from './components/Frame'
import Search from './components/Search'
import Select from './components/Select'
import Container from './components/Container'

import groupOptions from './group-options'
import groupContains from './group-contains'
import applyGlyph from './apply-glyph'

class Popup extends React.Component {
    constructor(props) {
        super(props)
        bind(this, ['handleSearch', 'handleSelect'])

        this.state = {
            frameVisibility: true,
            searchValue: '',
            selectGroup: []
        }
    }

    componentDidMount() {
        message.on('BROWSER_ACTION', () => {
            this.setState(prevState => ({
                frameVisibility: !prevState.frameVisibility
            }))
        })
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

    render() {
        const { selectGroup, searchValue, frameVisibility } = this.state
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
            <Frame isVisible={frameVisibility}>
                <Search onChange={this.handleSearch} />
                <Select
                    value={selectGroup}
                    options={groupOptions}
                    onChange={this.handleSelect}
                />
                <Container glyphs={visibleGlyphs} onClick={applyGlyph} />
            </Frame>
        )
    }
}

export default Popup
