import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import GroupPage from './containers/GroupPage';
import UserProfile from "./containers/UserProfile";
import FacebookLogin from 'react-facebook-login';
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import MemberSearchBar from "./component/MemberSearchBar";
import FacebookService from "./services/FacebookService";
import App from "./App";
import AdminManager from "./containers/AdminManager";


export const TAM_ID = '2713186265573577'
export const TAM_ACCESS_TOKEN =
    "EAAdxd9JUTZBoBAFvS12SoIH1bXo2xHPZBUnDMtEFZAnJtfwYqVAbIEgoS2sstDZAZAoHLIU1tOVDS2QkWVaYCUzFJRMp3p1VN1SNll2seTZA98TqNuuiXPD5zWNuW9aP326LOBCmEyzpyMmlZCNOSCj7wsevp7TeRj8Pk8afAN2JfMwCoZAJXgDU2lJhY5WDWTaFEGb0kBo4lAZDZD"


ReactDOM.render(
    <Router>
        <div>
            <Route path="/user/:userId"
                   component={UserProfile}>
            </Route>

            <Route path="/login"
                   component={LoginPage}>
            </Route>

            <Route path="/register"
                   component={RegisterPage}>
            </Route>

            <Route path="/admin"
                   component={AdminManager}>
            </Route>

            <Route path="/home"
                   component={App}>
            </Route>
        </div>
    </Router>,


    document.getElementById('root')
);