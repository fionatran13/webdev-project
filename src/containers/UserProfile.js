import React from 'react'
import GroupList from "./GroupList";

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '2',
            groupListAsAdmin: [],
            groupListAsMember: []
        }
        this.setParams = this.setParams.bind(this)
    }

    componentDidMount() {
        // this.setState({userId: this.props.params.match.userId})
    }
    setParams(params) {
        this.setState({userId: params.userId})
    }

    render() {
        return (
            <div>
                <h1>User Profile</h1>
                <h4>SOME USER INFO</h4>
                <h4>SOME USER INFO</h4>
                <h4>SOME USER INFO</h4>
                <h4>SOME USER INFO</h4>
                <h4>SOME USER INFO</h4>
                <h4>SOME USER INFO</h4>


                <br/>

                <GroupList userId={this.state.userId} userRole="admin"/>
                <GroupList userId={this.state.userId} userRole="member"/>
            </div>
        )
    }
}