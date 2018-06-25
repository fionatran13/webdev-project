/* global FB */
import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import FacebookLogin from 'react-facebook-login';
import MemberSearchBar from "./components/MemberSearchBar";
import AnonymousSearchPage from "./containers/AnonymousSearchPage";
import Homepage from "./containers/Homepage";
import LoginPage from "./containers/LoginPage";
import AdminManager from "./containers/AdminManager";
import ExpenseForm from "./components/ExpenseForm";
import GroupPage from "./containers/GroupPage";
import RegisterPage from "./containers/RegisterPage";
import UserProfile from "./containers/UserProfile";

export const TAM_ID = '2713186265573577'
export const TAM_ACCESS_TOKEN =
    "EAAdxd9JUTZBoBAFvS12SoIH1bXo2xHPZBUnDMtEFZAnJtfwYqVAbIEgoS2sstDZAZAoHLIU1tOVDS2QkWVaYCUzFJRMp3p1VN1SNll2seTZA98TqNuuiXPD5zWNuW9aP326LOBCmEyzpyMmlZCNOSCj7wsevp7TeRj8Pk8afAN2JfMwCoZAJXgDU2lJhY5WDWTaFEGb0kBo4lAZDZD"


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: {},
            friends: {}
        }
        // this.responseFacebook = this.responseFacebook.bind(this)
        this.setFriends = this.setFriends.bind(this)
    }

    // responseFacebook(response) {
    //     this.setState({user: response, friends: response.friends})
    //     //
    //     // FB.api(
    //     //     '/' + response.id,
    //     //     'GET',
    //     //     {},
    //     //     function(response) {
    //     //         console.log(response)
    //     //     }
    //     // );
    // }

    // handleResponse() {
    //     if (!this.state.loggedIn && this.state.user != {} && this.state.user.id != undefined) {
    //         this.setState({loggedIn: true})
    //         return <Redirect to={'/user/' + this.state.user.id}/>
    //     }
    // }

    setFriends(friends) {
        this.friendss = friends
        this.setState({friends: friends})
    }

    renderMemSearch(gid) {
        console.log('RENDER SEARCH BAR')
        if(this.state.user !== {} && this.state.friends !== {})
            console.log(this.state)
        return (<MemberSearchBar gid={gid} user={this.state.user}
                                 friends={this.state.friends.data}/>)
    }

    render() {

        return (
        <Switch>
            <div>
                <Route path="/user/:userId/profile/:mode"
                       component={UserProfile}>
                </Route>

                <Route path="/login"
                       render={() => <LoginPage setFriends={this.setFriends}/>}>
                </Route>

                <Route path="/register"
                       component={RegisterPage}>
                </Route>

                <Route path="/admin"
                       component={AdminManager}>
                </Route>

                <Route path="/app"
                       component={App}>
                </Route>

                <Route path="/user/:uid/group/:groupId"
                    // component={MemberSearchBar} something={this.state.friends}>
                       render={(props) => this.renderMemSearch(props.match.params.groupId)}>
                </Route>

                <Route path="/user/:userId/group/:groupId"
                       component={GroupPage}>
                </Route>

                <Route path="/group/:groupId/expense"
                       component={ExpenseForm}>
                </Route>

                <Route path="/anonymous"
                       component={AnonymousSearchPage}>
                </Route>

                <Route path="/home"
                       component={Homepage}>
                </Route>
            </div>
        </Switch>
    )
    }
}

// {/*<Router>*/}
// {/*<div>*/
// }
// {/*<div className="container-fluid">*/
// }
// {/*<Route path="/user/:uid"*/
// }
// {/*render={() => <MemberSearchBar user={this.state.user}*/
// }
// {/*friends={this.state.friends.data}/>}>*/
// }
// {/*</Route>*/
// }
// {/*</div>*/
// }
// {/*<div hidden={this.state.loggedIn}>*/
// }
// {/*<FacebookLogin*/
// }
// {/*appId="2260374724192830"*/
// }
// {/*autoLoad={true}*/
// }
// {/*fields="name,email,picture,friends"*/
// }
// {/*callback={this.responseFacebook}/>*/
// }
// {/*{this.handleResponse()}*/
// }
// {/*</div>*/
// }
// {/*</div>*/
// }
//
// {/*</Router>*/
// }