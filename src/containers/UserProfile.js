import React from 'react'
import GroupList from "./GroupList";
import SearchBar from "../components/SearchBar";

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            groupListAsAdmin: [],
            groupListAsMember: []
        }
    }

    componentDidMount() {
        this.setState({userId: this.props.match.params.userId});
    }

    renderSearchBar() {
        if(this.state.userId !== '') {
            return(<SearchBar id={this.state.userId}/>)
        }
    }

    renderGroupLists() {
        if(this.state.userId !== '') {
            return(<div>
                <GroupList userId={this.state.userId} userRole="admin"/>
                <GroupList userId={this.state.userId} userRole="member"/>
            </div>)
        }
    }

    render() {
        return (
            <div>
                <h1>User Profile</h1>
                <br/>
                {this.renderSearchBar()}
                <br/>

                {this.renderGroupLists()}
            </div>
        )
    }
}