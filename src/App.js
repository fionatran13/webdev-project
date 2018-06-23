/* global FB */
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
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
            profile: {},
            friends: []
        }

        // this.componentClicked = this.componentClicked.bind(this)
        this.responseFacebook = this.responseFacebook.bind(this)
    }

    responseFacebook(response) {
        console.log(response);
        FB.api(
            '/' + response.id,
            'GET',
            {},
            function(response) {
                console.log(response)
            }
        );
    }

    render() {
        return (
            <div>
                {/*<MemberSearchBar id={2713186265573577}/>*/}
                <FacebookLogin
                    appId="2260374724192830"
                    autoLoad={false}
                    fields="name,email,picture,friends"
                    callback={this.responseFacebook} />
            </div>
        )
    }
}