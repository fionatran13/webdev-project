import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import GroupPage from './containers/GroupPage';
import UserProfile from "./containers/UserProfile";
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
    console.log(response);
}

const componentClicked = (event) => {
    console.log(event);
}

ReactDOM.render(
    <Router>
        {/*<FacebookLogin*/}
            {/*appId="2260374724192830"*/}
            {/*autoLoad={false}*/}
            {/*fields="name,email,picture"*/}
            {/*onClick={componentClicked}*/}
            {/*callback={responseFacebook} />*/}

        {/*<div>*/}
            {/*<Route path="/user/:userId"*/}
                   {/*component={UserProfile}>*/}
            {/*</Route>*/}
        {/*</div>*/}
    </Router>,
    document.getElementById('root')
)