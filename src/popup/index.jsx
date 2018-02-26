import React from 'react'
import styled from 'styled-components'
import { bind } from '../.utils/react-utils'
import { and, or, object } from '../.utils/predicates'
import { glyphs } from '../unicode/lookup-table/aglfn'
import message from '../.utils/chrome/message'
import isEqualArray from '../.utils/is-equal-array'

import Frame from './components/Frame'
import Header from './components/Header'
import Footer from './components/Footer'
import Body from './components/Body'
import Overlay from './components/Overlay'
import Search from './components/Search'
import Select from './components/Select'
import GlyphsContainer from './components/GlyphsContainer'

import { groupByString, groupByArray } from './group-contains'
import groupOptions from './group-options'
import applyGlyph from './apply-glyph'

const RECENT_GLYPHS_AMOUNT = 10
const INITIAL_GLYPHS_AMOUNT = 100
const INITIAL_GLYPHS_TIMEOUT = 500

const searchPlaceholder = 'Search by name, unicode, category or block...'

const RecentGlyphsContainer = GlyphsContainer.extend`
    background: #fafafa;
    margin: 0 0 5px;
`

class Popup extends React.Component {
    constructor(props) {
        super(props)
        bind(this, [
            'visibleGlyphs',
            'handleApplyGlyph',
            'handleSearch',
            'handleSelect',
            'handleOpenSelect',
            'handleCloseSelect',
            'handleHover'
        ])

        this.state = {
            glyphs: glyphs.slice(0, INITIAL_GLYPHS_AMOUNT),
            isVisible: true,
            isOpenSelect: false,
            searchValue: '',
            selectedGroups: [],
            recentGlyphs: [],
            hoverValue: ''
        }
        this.lastVisibleGlyphs = []
    }

    componentDidMount() {
        message.on('BROWSER_ACTION', () => {
            this.setState(prevState => ({
                isVisible: !prevState.isVisible
            }))
        })

        // for better performance
        setTimeout(() =>
            this.setState({ glyphs }),
            INITIAL_GLYPHS_TIMEOUT
        )
    }

    visibleGlyphs() {
        const { glyphs, searchValue, selectedGroups } = this.state
        const result = glyphs.filter(
            and(
                or(
                    object.icontains('value', searchValue),
                    object.icontains('name', searchValue),
                    groupByString('category', searchValue),
                    groupByString('block', searchValue)
                ),
                or(
                    groupByArray('category', selectedGroups),
                    groupByArray('block', selectedGroups)
                )
            )
        )
        if (isEqualArray(result, this.lastVisibleGlyphs)) {
            return this.lastVisibleGlyphs
        }
        this.lastVisibleGlyphs = result
        return result
    }

    handleApplyGlyph(nextGlyph) {
        if (applyGlyph(nextGlyph)) {
            let { recentGlyphs } = this.state
            if (recentGlyphs[0] === nextGlyph) {
                return
            }
            let nextRecentGlyphs = recentGlyphs
                .filter(glyph => glyph.value !== nextGlyph.value)
                .slice(0, RECENT_GLYPHS_AMOUNT - 1)

            nextRecentGlyphs.unshift(nextGlyph)
            this.setState({
                recentGlyphs: nextRecentGlyphs
            })
        }
    }

    handleSearch({ target }) {
        this.setState({
            searchValue: target.value
        })
    }

    handleSelect(selection) {
        this.setState({
            selectedGroups: selection
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
        if (this.state.isVisible === false) {
            return null
        }
        const { searchValue, selectedGroups, recentGlyphs } = this.state
        return (
            <Frame title={'Glyphs'}>
                <Header>
                    <RecentGlyphsContainer
                        items={recentGlyphs}
                        placeholder={RECENT_GLYPHS_AMOUNT}
                        onClick={this.handleApplyGlyph}
                        onHover={this.handleHover}
                    />
                    <Search
                        defaultValue={searchValue}
                        placeholder={searchPlaceholder}
                        onChange={this.handleSearch}
                    />
                    <Select
                        value={selectedGroups}
                        options={groupOptions}
                        onChange={this.handleSelect}
                        onOpen={this.handleOpenSelect}
                        onClose={this.handleCloseSelect}
                    />
                </Header>
                <Body>
                    <GlyphsContainer
                        items={this.visibleGlyphs()}
                        onClick={this.handleApplyGlyph}
                        onHover={this.handleHover}
                        emptyText={'no results'}
                    />
                </Body>
                <Footer value={this.state.hoverValue} />
                <Overlay isVisible={this.state.isOpenSelect} />
            </Frame>
        )
    }
}

export default Popup
