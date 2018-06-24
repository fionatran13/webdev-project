import React from 'react'
import UserService from "../services/UserService";
import UserRow from "../component/UserRow";

export default class AdminManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameInp: '',
            pwInp: '',
            emailInp: '',
            picInp: '',
            userRoleInp: '',
            users: []}
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

    createUser() {
        if(this.state.userRoleInp == 'User') {
            const newUser = {username: this.state.usernameInp,
                password: this.state.pwInp,
                email: this.state.emailInp,
                pictureUrl: this.state.picInp};
            this.userService.createUser(newUser, 0)
                .then(response => this.fetchUsers())
        }
        else if(this.state.userRoleInp == 'Admin') {
            const newUser = {username: this.state.usernameInp,
                password: this.state.pwInp,
                email: this.state.emailInp,
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
            <div className="container">
                <h1 id="title">User Admin</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Profile pic URL</th>
                    </tr>
                    <tr>
                        <th><input id="id" className="form-control" placeholder="12345" readOnly={true}/></th>
                        <th><input onChange={this.setUsername} className="form-control" placeholder="username" required/></th>
                        <th><input onChange={this.setPW} id="passwordFld" className="form-control" type="password" placeholder="***" required/></th>
                        <th><input onChange={this.setEmail} className="form-control" placeholder="johndoe@gmail.com"/></th>
                        <th><input onChange={this.setPicURL} id="picFld" className="form-control" placeholder="../src/1400.jpg"/></th>

                        <th className="col-sm-9">
                            <select id="roleFld" className="form-control" onChange={this.setUserRole}>
                                <option> </option>
                                <option>User</option>
                                {/*<option>Admin</option>*/}
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
            </div>
        )
    }


}