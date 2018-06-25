import React from 'react'
import UserService from "../services/UserService";
import UserRow from "../components/UserRow";
import GroupList from "./GroupList";

export default class AdminManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameInp: '',
            pwInp: '',
            emailInp: '',
            phoneInp:'',
            picInp: '',
            userRoleInp: '',
            users: []
        }
        this.userService = UserService.instance
        this.createUser = this.createUser.bind(this)
        this.setUsername = this.setUsername.bind(this)
        this.setPW = this.setPW.bind(this)
        this.setEmail = this.setEmail.bind(this)
        this.setPicURL = this.setPicURL.bind(this)
        this.setUserRole = this.setUserRole.bind(this)
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        this.userService.findAllUsers().then(response => this.setState({users: response}))
    }

    setUsername(event) {
        this.setState({usernameInp: event.target.value})
    }

    setPW(event) {
        this.setState({pwInp: event.target.value})
    }

    setEmail(event) {
        this.setState({emailInp: event.target.value})
    }

    setPhone(event) {
        this.setState({phoneInp: event.target.value})
    }

    setPicURL(event) {
        this.setState({picInp: event.target.value})
    }

    setUserRole(event) {
        this.setState({userRoleInp: event.target.value})
    }

    renderUsers() {
        let list = null;
        let self = this;
            list = this.state.users.map(
                function (item) {
                    return (<UserRow key={item.id} info={item}/>)
                }
            )
        return (
            list
        )
    }

    renderGroups() {
        return(<GroupList userId="0" userRole="systemAdmin"/>)
    }

    createUser() {
        if(this.state.userRoleInp == 'User') {
            const newUser = {username: this.state.usernameInp,
                password: this.state.pwInp,
                email: this.state.emailInp,
                phone: this.state.phoneInp,
                pictureUrl: this.state.picInp};
            this.userService.createUser(newUser, 0)
                .then(response => this.fetchUsers())
        }
        else if(this.state.userRoleInp == 'Admin') {
            const newUser = {username: this.state.usernameInp,
                password: this.state.pwInp,
                email: this.state.emailInp,
                phone: this.state.phoneInp,
                pictureUrl: this.state.picInp};
            this.userService.createAdmin(newUser)
                .then(response => this.fetchUsers())
        }
        else {
            alert('Choose user role')
        }
    }



    render() {
        return (
            <div className="container-fluid">
                <h1 id="title">SYSTEM ADMINISTRATION</h1>
                <table className="table-sm table-responsive">
                    <div className="container">
                        <h2 className="text-center text-uppercase text-secondary mb-0">
                            ALL USERS
                        </h2>
                    </div>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Profile pic URL</th>
                    </tr>
                    <tr>
                        <th><input id="id" className="form-control" placeholder="12345" readOnly={true}/></th>
                        <th><input onChange={this.setUsername} className="form-control" placeholder="username" required/></th>
                        <th><input onChange={this.setPW} id="passwordFld" className="form-control" type="password" placeholder="***" required/></th>
                        <th><input onChange={this.setEmail} className="form-control" placeholder="johndoe@gmail.com"/></th>
                        <th><input onChange={this.setPhone} className="form-control" placeholder="123-123-1234"/></th>
                        <th><input onChange={this.setPicURL} id="picFld" className="form-control" placeholder="../src/1400.jpg"/></th>

                        <th>
                            <select id="roleFld" className="form-control" onChange={this.setUserRole}>
                                <option> </option>
                                <option>User</option>
                                <option>Admin</option>
                            </select>
                        </th>
                        <th>
                            <button id="createUser" className="btn btn-success" onClick={this.createUser}>
                                <i className="far fa-plus-square"></i>
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderUsers()}
                    </tbody>
                    <tfoot></tfoot>
                </table>
                {this.renderGroups()}

            </div>
        )
    }


}