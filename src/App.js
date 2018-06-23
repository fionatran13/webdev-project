/* global FB */
import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import FacebookLogin from 'react-facebook-login';
import MemberSearchBar from "./component/MemberSearchBar";

export const TAM_ID = '2713186265573577'
export const TAM_ACCESS_TOKEN =
    "EAAdxd9JUTZBoBAFvS12SoIH1bXo2xHPZBUnDMtEFZAnJtfwYqVAbIEgoS2sstDZAZAoHLIU1tOVDS2QkWVaYCUzFJRMp3p1VN1SNll2seTZA98TqNuuiXPD5zWNuW9aP326LOBCmEyzpyMmlZCNOSCj7wsevp7TeRj8Pk8afAN2JfMwCoZAJXgDU2lJhY5WDWTaFEGb0kBo4lAZDZD"


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: {},
            friends: []
        }
        this.responseFacebook = this.responseFacebook.bind(this)
    }

    responseFacebook(response) {
        console.log(response)
        this.setState({user: response, friends: response.friends})
        //
        // FB.api(
        //     '/' + response.id,
        //     'GET',
        //     {},
        //     function(response) {
        //         console.log(response)
        //     }
        // );
    }

    handleResponse() {
        if (!this.state.loggedIn && this.state.user != {} && this.state.user.id != undefined) {
            this.setState({loggedIn: true})
            return <Redirect to={'/user/' + this.state.user.id}/>
        }
    }

    // render() {
    //     return (
    //         <Router>
    //             <div className="container-fluid">
    //
    //                 <div>
    //                     <FacebookLogin
    //                         appId="2260374724192830"
    //                         autoLoad={true}
    //                         fields="name,email,picture,friends"
    //                         callback={this.responseFacebook}/>
    //                     {this.handleResponse()}
    //                 </div>
    //             </div>
    //
    //             <Route path="/user/:uid"
    //                    component={<MemberSearchBar friends={this.state.friends}/>}>
    //             </Route>
    //         </Router>
    //     )
    // }

    render() {
        return (
            <Router>
                <div>
                    <div className="container-fluid">
                        <Route path="/user/:uid"
                               render={() => <MemberSearchBar user={"2713186265573577"}
                                                              friends={[{name: "Fiona", id: "1870318346364001"}]}/>}>
                        </Route>
                    </div>
                    <div hidden={this.state.loggedIn}>
                        <FacebookLogin
                            appId="2260374724192830"
                            autoLoad={true}
                            fields="name,email,picture,friends"
                            callback={this.responseFacebook}/>
                        {this.handleResponse()}
                    </div>
                </div>

            </Router>
        )
    }
}