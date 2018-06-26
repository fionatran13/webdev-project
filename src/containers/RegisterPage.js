import React from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import UserService from '../services/UserService'

export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            password2: ''
        };
        this.service = UserService.instance;
        this.setPassword = this.setPassword.bind(this);
        this.setPassword2 = this.setPassword2.bind(this);
        this.setUsername = this.setUsername.bind(this);
    }

    verify() {
        if (this.state.password === this.state.password2) {
            this.createUser();
        } else {
            window.alert('Passwords do not match. Try again.')
        }
    }

    createUser() {
        var user = {username: this.state.username, password: this.state.password}
        this.service.createUser(user, 0).then(response => {
            if(response.status === 500) {
                alert('Username taken')
            } else {
                window.location.href = '/user/' + response.id +'/profile/edit'
            }
        });
    }

    setUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    setPassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    setPassword2(event) {
        this.setState({
            password2: event.target.value
        })
    }

    render() {
        return (
            <Switch>
            <div className="container-fluid">
                <h2>Register for a new account</h2>

                <div className="form-group">
                    <h3>Username</h3>
                    <input placeholder="Username"
                           className="form-control"
                           value={this.state.username}
                            onChange={this.setUsername}/>
                </div>

                <div className="form-group">
                    <h3>Password</h3>
                    <input placeholder="Password"
                           className="form-control"
                           value={this.state.password}
                            onChange={this.setPassword}/>
                </div>

                <div className="form-group">
                    <h3>Verify Password</h3>
                    <input placeholder="Password"
                           className="form-control"
                           value={this.state.password2}
                            onChange={this.setPassword2}/>
                </div>

                <div className="form-group">
                    <button className="btn btn-block btn-info"
                            onClick={() => this.verify()}>Create
                    </button>
                </div>

                <div className="form-group">
                    <a>Already have an account? Sign in </a>
                    <Link to={`/login`}>here.</Link>
                </div>
            </div>
            </Switch>
        )
    }
}