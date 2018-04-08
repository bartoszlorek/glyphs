import React from 'react'
import styled from 'styled-components'
import { bind } from '../.utils/react-utils'
import { and, or, object } from '../.utils/predicates'
import { glyphs } from '../unicode/lookup-tables/aglfn-gg-sorted'
import message from '../.utils/chrome/message'
import isEqualArray from '../.utils/is-equal-array'
import createFocus from '../.utils/focus'

import Flash from './components/Flash'
import Frame from './components/Frame'
import Header from './components/Header'
import Footer from './components/Footer'
import Body from './components/Body'
import Overlay from './components/Overlay'
import Select from './components/Select'
import InputSearch from './components/InputSearch'
import GlyphsContainer from './components/GlyphsContainer'

import { groupContainsValue, groupContainsArray } from './group-contains'
import groupOptions from './group-options'
import applyGlyph from './apply-glyph'

const RECENT_GLYPHS_AMOUNT = 10
const INITIAL_GLYPHS_AMOUNT = 100
const INITIAL_GLYPHS_TIMEOUT = 500

const searchPlaceholder = 'Search by name, unicode value or category...'

const isHandler = elem => {
    return elem && elem.classList.contains('frame-handler')
}

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
            'handleVisible',
            'handleSearch',
            'handleSelect',
            'handleOpenSelect',
            'handleCloseSelect',
            'handleHover',
            'handleCloseFlash',
            'handleFrameMouseUp'
        ])

        this.state = {
            glyphs: glyphs.slice(0, INITIAL_GLYPHS_AMOUNT),
            isVisible: true,
            isOpenSelect: false,
            searchValue: '',
            selectedGroups: [],
            recentGlyphs: [],
            hoverValue: '',
            error: ''
        }
        this.lastVisibleGlyphs = []
        this.focus = createFocus(10)
            .push('active')
            .attach()
    }

    componentDidMount() {
        message.on('BROWSER_ACTION', () => {
            this.handleVisible()
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
                    groupContainsValue(searchValue)
                ),
                or(groupContainsArray(selectedGroups))
            )
        )
        if (isEqualArray(result, this.lastVisibleGlyphs)) {
            return this.lastVisibleGlyphs
        }
        this.lastVisibleGlyphs = result
        return result
    }

    handleApplyGlyph(nextGlyph) {
        applyGlyph(nextGlyph)
            .then(() => {
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
            })
            .catch(error => this.setState({ error }))
    }

    handleVisible() {
        if (this.state.isVisible) {
            this.focus.detach()
        } else {
            this.focus.attach()
        }
        this.setState(prevState => ({
            isVisible: !prevState.isVisible
        }))
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

    handleCloseFlash() {
        this.setState({
            error: ''
        })
    }

    handleFrameMouseUp(e) {
        this.focus.prev(1, () => isHandler(e.target))
    }

    render() {
        if (this.state.isVisible === false) {
            return null
        }
        return (
            <Frame
                title={'Glyphs'}
                onClose={this.handleVisible}
                onMouseUp={this.handleFrameMouseUp}
            >
                <Header>
                    <RecentGlyphsContainer
                        items={this.state.recentGlyphs}
                        placeholder={RECENT_GLYPHS_AMOUNT}
                        onClick={this.handleApplyGlyph}
                        onHover={this.handleHover}
                    />
                    <InputSearch
                        defaultValue={this.state.searchValue}
                        placeholder={searchPlaceholder}
                        onChange={this.handleSearch}
                    />
                    <Select
                        value={this.state.selectedGroups}
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
                <Flash
                    value={this.state.error}
                    onClose={this.handleCloseFlash}
                />
            </Frame>
        )
    }
}

export default Popup
