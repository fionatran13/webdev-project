import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import UserProfile from "./containers/UserProfile";
import SearchBar from "./component/SearchBar";

ReactDOM.render(
    <Router>
        <div>
            <Route path="/user/:userId"
                   component={UserProfile}>
            </Route>
        </div>
    </Router>,
    document.getElementById('root')
);
