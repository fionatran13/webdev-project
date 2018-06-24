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
        console.log(this.props);
        this.setState({userId: this.props.match.params.userId});
    }

    renderSearchBar() {
        if(this.state.userId !== '') {
            return(<SearchBar id={this.state.userId}/>)
        }
    }

    render() {
        console.log(this.state.userId)
        return (
            <div>
                <h1>User Profile</h1>
                <br/>
                {this.renderSearchBar()}
                <br/>

                <GroupList userId={this.props.match.params.userId} userRole="admin"/>
                <GroupList userId={this.props.match.params.userId} userRole="member"/>
            </div>
        )
    }
}