/* global FB */
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import GroupPage from './containers/GroupPage';
import UserProfile from "./containers/UserProfile";
import FacebookLogin from 'react-facebook-login';
import MemberSearchBar from "./component/MemberSearchBar";
import FacebookService from "./services/FacebookService";
import App from "./App";

export const TAM_ID = '2713186265573577'
export const TAM_ACCESS_TOKEN =
    "EAAdxd9JUTZBoBAFvS12SoIH1bXo2xHPZBUnDMtEFZAnJtfwYqVAbIEgoS2sstDZAZAoHLIU1tOVDS2QkWVaYCUzFJRMp3p1VN1SNll2seTZA98TqNuuiXPD5zWNuW9aP326LOBCmEyzpyMmlZCNOSCj7wsevp7TeRj8Pk8afAN2JfMwCoZAJXgDU2lJhY5WDWTaFEGb0kBo4lAZDZD"

const responseFacebook = (response) => {
    console.log(response);

    FB.api(
        '/' + response.id,
        'GET',
        {},
        function(response) {
            // Insert your code here
            console.log(response)
        }
    );
}

const componentClicked = (event) => {
    // FB.login(function(response) {
    //     console.log(response)
    // }, {scope: ['user_friends']});

}

ReactDOM.render(
    <Router>
        {/*<div>*/}
            {/*<MemberSearchBar id={2713186265573577}/>*/}
            {/*<FacebookLogin*/}
                {/*appId="2260374724192830"*/}
                {/*autoLoad={false}*/}
                {/*fields="name,email,picture,friends"*/}
                {/*onClick={componentClicked}*/}
                {/*callback={responseFacebook} />*/}
        {/*</div>*/}
        <div>
            <Route path="/home" component={App}></Route>
            <Route path="/user/:uid" component={MemberSearchBar}></Route>

        </div>


        {/*<div>*/}
            {/*<Route path="/user/:userId"*/}
                   {/*component={UserProfile}>*/}
            {/*</Route>*/}
        {/*</div>*/}
    </Router>,
    document.getElementById('root')
)