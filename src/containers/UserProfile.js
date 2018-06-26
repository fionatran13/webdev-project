import React from 'react'
import GroupList from "./GroupList";
import SearchBar from "../components/SearchBar";
import UserService from "../services/UserService";
import ExpensesList from "../containers/ExpensesList"
import PaymentDueList from "./PaymentDueList";

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            groupListAsAdmin: [],
            groupListAsMember: [],
            newUsername: '',
            newEmail: '',
            newPhone:'',
            mode: ''
        }
        this.service = UserService.instance
        this.setUser = this.setUser.bind(this)
        this.setEmail = this.setEmail.bind(this)
        this.setPhone = this.setPhone.bind(this)
    }

    componentDidMount() {
        this.setState({mode: this.props.match.params.mode})
        this.setState({userId: this.props.match.params.userId})
        this.setUser();
    }

    hideEdit() {
        return this.state.mode != 'edit'
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
            .then(window.location.href = '/user/' + this.state.userId + '/profile/edit')
    }

    renderSearchBar() {
        if(this.state.userId !== '') {
            return(<SearchBar id={this.state.userId}/>)
        }
    }

    renderExpenses() {
        if(this.state.userId !== '') {
            return(<ExpensesList userId={this.state.userId}
                                    groupId={0}
                                    anonymous={true}/>)
        }
    }

    renderDues() {
        if(this.state.userId !== '') {
            return(<PaymentDueList userId={this.state.userId}
                                 groupId={0}/>)
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
                               onChange={this.setEmail} readOnly={this.hideEdit()}/>
                    </div>

                    <div className="form-group">
                        <h3>Phone</h3>
                        <input value={this.state.newPhone} className="form-control"
                               onChange={this.setPhone} readOnly={this.hideEdit()}/>
                    </div>

                    <div className="form-group">
                        <button hidden={this.hideEdit()} className="btn btn-block btn-info"
                                onClick={() => this.updateUser()}>Save Changes
                        </button>
                    </div>
                </div>
                <div hidden={this.hideEdit()}>
                    <br/>
                    {this.renderSearchBar()}
                    <br/>
                    {this.renderGroupLists()}
                    <br/>
                    {this.renderExpenses()}
                    <br/>
                    {this.renderDues()}
                </div>

            </div>
        )
    }
}