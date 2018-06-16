import React from 'react'
import GroupList from "./GroupList";
import SearchBar from "../component/SearchBar";

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

    render() {
        return (
            <div>
                <h1>User Profile</h1>
                <br/>
                <SearchBar id={this.state.userId}/>
                <br/>

                <GroupList userId={this.props.match.params.userId} userRole="admin"/>
                <GroupList userId={this.props.match.params.userId} userRole="member"/>
            </div>
        )
    }
}