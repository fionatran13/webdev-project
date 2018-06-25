import React from 'react'
import GroupList from "./GroupList";
import SearchBar from "../components/SearchBar";
import UserService from "../services/UserService";

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            groupListAsAdmin: [],
            groupListAsMember: [],
            newUsername: '',
            newEmail: '',
            newPhone:''
        }
        this.service = UserService.instance
        this.setUser = this.setUser.bind(this)
        this.setEmail = this.setEmail.bind(this)
        this.setPhone = this.setPhone.bind(this)
    }

    componentDidMount() {
        this.setState({userId: this.props.match.params.userId})
        this.setUser();
    }

    setUser() {
        this.service.findUserByID(this.props.match.params.userId)
            .then((res) => this.setState({newUsername: res.username, newEmail: res.email, newPhone: res.phone}))

    }

    setEmail(event) {
        this.setState({
            newEmail: event.target.value
        })
    }

    setPhone(event) {
        this.setState({
            newPhone: event.target.value
        })
    }

    updateUser() {
        var newUser = {id: this.state.userId, username: this.state.newUsername, email: this.state.newEmail, phone: this.state.newPhone}
        this.service.updateUser(this.state.userId, newUser)
            .then(window.location.href = '/user/' + this.state.userId + '/profile')
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
                <div className="container-fluid">

                    <div className="form-group">
                        <h3>Username</h3>
                        <input placeholder={this.state.newUsername}  type="text" className="form-control" readOnly/>
                    </div>

                    <div className="form-group">
                        <h3>Email</h3>
                        <input value={this.state.newEmail} className="form-control"
                               onChange={this.setEmail}/>
                    </div>

                    <div className="form-group">
                        <h3>Phone</h3>
                        <input value={this.state.newPhone} className="form-control"
                               onChange={this.setPhone}/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block btn-info"
                                onClick={() => this.updateUser()}>Save Changes
                        </button>
                    </div>
                </div>
                <br/>
                {this.renderSearchBar()}
                <br/>

                {this.renderGroupLists()}
            </div>
        )
    }
}