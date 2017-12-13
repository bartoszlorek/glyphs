import React from 'react'
import { map } from 'lodash'
import table from '../unicode/table'

import Category from './Category'
import style from './style.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <input type='text'/>
                <div className={style.container}>
                    {map(table, (chars, key) =>
                        <Category
                            key={key}
                            description={key}
                            characters={chars}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default App