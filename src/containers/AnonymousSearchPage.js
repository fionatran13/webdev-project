import React from 'react'
import SearchBar from '../components/SearchBar'

export default class AnonymousSearchPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h3>Search for your group</h3>
                <SearchBar anonymous={true}/>
            </div>
        )
    }
}