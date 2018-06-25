/* global FB */
import React from 'react'
import FacebookLogin from 'react-facebook-login';
import {Link} from 'react-router-dom';
import UserService from "../services/UserService";
import MemberSearchBar from "../components/MemberSearchBar";
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import GroupPage from "./GroupPage";


export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            fbId: 0,
            loggedIn: false,
            friends: [],
            user: {}
        };
        this.service = UserService.instance;
        this.setPassword = this.setPassword.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setFBId = this.setFBId.bind(this);
        this.login = this.login.bind(this);
        this.navigateToProfile = this.navigateToProfile.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this)

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

    setFBId(id) {
        this.setState({
            fbId: id
        })
    }

    redirect() {
        if (!this.state.loggedIn && this.state.user != {} && this.state.user.id != undefined) {
            this.setState({loggedIn: true})
            //return <Redirect to={'/user/' + this.state.user.id + '/profile'}/>
             window.location.href = '/user/' + this.state.user.id + '/profile'
        }
    }

    responseFacebook(response) {
        console.log(this.props)
        this.props.setFriends(response.friends)
        this.setState({user: response, friends: response.friends})

        let self = this;

        this.service.findFBUserById(response.id)
            .then(function (result) {
                if (result === undefined) {
                    self.setFBId(response.id);
                    self.setState({username: response.name});
                    self.createFBUser();
                } else {
                    self.service.findUserByID(response.id)
                        .then((res) =>
                        self.setState({user: res}))
                        .then(self.redirect())
                }
            });
    }

    // FB.api(
    //     '/' + response.id,
    //     'GET',
    //     {},
    //     function(response) {
    //         // Insert your code here
    //         console.log(response)
    //     }
    // );
    //
    // FB.Event.subscribe('auth.authResponseChange', async response => {
    //     console.log(response)
    //     // try {
    //     //     const { profile, myFriends } = await getData();
    //     //     this.setState({ status: response.status, profile, myFriends });
    //     // } catch (e) {
    //     //     this.setState({ status: 'err' });
    //     // }
    // });


    componentClicked = (event) => {
        // FB.login(function(response) {
        //     console.log(response)
        // }, {scope: ['user_friends']});

    };

    createFBUser() {
        var user = {username: this.state.username, password: this.state.password};
        this.service.createUser(user, this.state.fbId);
    }

    handleResponse(response) {
        console.log(response)
        if (response.status !== 500) {
            return <Redirect to={'/user/' + this.state.user.id + '/profile'}/>
        } else {
            window.alert('Invalid credentials')
        }
    }

    login() {
        var user = {username: this.state.username, password: this.state.password};
        this.service.login(user)
            .then((response) => this.handleResponse(response))
    }

    navigateToProfile() {
        this.service.findUserByUsername(this.state.username);
    }

    render() {
        return (
            <Router>
                <div>
                <div className="container-fluid">
                    {/*<Route path="/user/:userId/group/:groupId"*/}
                           {/*render={() => console.log(this.state.user)*/}
                               {/*// <MemberSearchBar user={this.state.user}*/}
                               {/*//                            friends={this.state.friends.data}/>*/}
                           {/*}*/}
                           {/*component={GroupPage}*/}
                    {/*>*/}
                    {/*</Route>*/}
                </div>

                <div className="container-fluid">
                    <h2>Login with Facebook or your Split the Bill account</h2>

                    <div className="form-group">
                        <h3>Username</h3>
                        <input placeholder="Username" className="form-control"
                               onChange={this.setUsername}/>
                    </div>

                    <div className="form-group">
                        <h3>Password</h3>
                        <input placeholder="Password" className="form-control"
                               onChange={this.setPassword}/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block btn-info"
                                onClick={() => this.login()}>Login
                        </button>
                    </div>


                    <div hidden={this.state.loggedIn}>
                        <FacebookLogin
                            appId="2260374724192830"
                            autoLoad={false}
                            fields="name,email,picture,friends"
                            callback={this.responseFacebook}/>
                    </div>
                    {this.redirect()}

                    <div className="form-group">
                        <a>Don't have an account? Register </a>
                        <Link to={`/register`}>here.</Link>
                    </div>
                </div>
                </div>
            </Router>
        )
    }
}
