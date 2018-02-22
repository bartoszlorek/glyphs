import React from 'react'
import { bind } from '../.utils/react-utils'
import { and, or, object } from '../.utils/predicates'
import { glyphs } from '../unicode/lookup-table/aglfn'
import message from '../.utils/chrome/message'

import Frame from './components/Frame'
import Header from './components/Header'
import Body from './components/Body'
import Overlay from './components/Overlay'
import Search from './components/Search'
import Select from './components/Select'
import Container from './components/Container'

import groupOptions from './group-options'
import groupContains from './group-contains'
import applyGlyph from './apply-glyph'

class Popup extends React.Component {
    constructor(props) {
        super(props)
        bind(this, [
            'handleSearch',
            'handleSelect',
            'handleOpenSelect',
            'handleCloseSelect'
        ])

        this.state = {
            frameVisibility: true,
            isOpenSelect: false,
            glyphs: glyphs.slice(0, 100),
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

        // for better performance
        setTimeout(() => this.setState({ glyphs }), 500)
    }

    handleSearch({ target }) {
        this.setState({ searchValue: target.value })
    }

    handleSelect(selection) {
        this.setState({ selectGroup: selection })
    }

    handleOpenSelect() {
        this.setState({ isOpenSelect: true })
    }

    handleCloseSelect() {
        this.setState({ isOpenSelect: false })
    }

    render() {
        const { selectGroup, searchValue, frameVisibility } = this.state
        const visibleGlyphs = this.state.glyphs.filter(
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
            <Frame title={'Glyphs'} isVisible={frameVisibility}>
                <Header>
                    <Search
                        defaultValue={searchValue}
                        onChange={this.handleSearch}
                    />
                    <Select
                        value={selectGroup}
                        options={groupOptions}
                        onChange={this.handleSelect}
                        onOpen={this.handleOpenSelect}
                        onClose={this.handleCloseSelect}
                    />
                </Header>
                <Body>
                    <Container glyphs={visibleGlyphs} onClick={applyGlyph} />
                </Body>
                <Overlay isVisible={this.state.isOpenSelect} />
            </Frame>
        )
    }
}

export default Popup
