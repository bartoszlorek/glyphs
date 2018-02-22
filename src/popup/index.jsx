import React from 'react'
import { bind } from '../.utils/react-utils'
import { and, or, object } from '../.utils/predicates'
import { glyphs } from '../unicode/lookup-table/aglfn'
import message from '../.utils/chrome/message'

import Frame from './components/Frame'
import Header from './components/Header'
import Footer from './components/Footer'
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
            'handleCloseSelect',
            'handleHover'
        ])

        this.state = {
            glyphs: glyphs.slice(0, 100),
            visibility: true,
            isOpenSelect: false,
            searchValue: '',
            selectGroup: [],
            hoverValue: ''
        }
    }

    componentDidMount() {
        message.on('BROWSER_ACTION', () => {
            this.setState(prevState => ({
                visibility: !prevState.visibility
            }))
        })

        // for better performance
        setTimeout(() => this.setState({ glyphs }), 500)
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

    handleOpenSelect() {
        this.setState({
            isOpenSelect: true
        })
    }

    handleCloseSelect() {
        this.setState({
            isOpenSelect: false
        })
    }

    handleHover(value = '') {
        this.setState({
            hoverValue: value
        })
    }

    render() {
        if (this.state.visibility === false) {
            return null
        }
        const { selectGroup, searchValue } = this.state
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
            <Frame title={'Glyphs'}>
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
                    <Container
                        glyphs={visibleGlyphs}
                        onClick={applyGlyph}
                        onHover={this.handleHover}
                    />
                </Body>
                <Footer value={this.state.hoverValue} />
                <Overlay isVisible={this.state.isOpenSelect} />
            </Frame>
        )
    }
}

export default Popup
