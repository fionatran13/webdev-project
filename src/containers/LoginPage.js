/* global FB */
import React from 'react'
import FacebookLogin from 'react-facebook-login';
import {Link} from 'react-router-dom';



export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            username:'',
            password:''
        }
    }

    responseFacebook = (response) => {
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

        FB.Event.subscribe('auth.authResponseChange', async response => {
            console.log(response)
            // try {
            //     const { profile, myFriends } = await getData();
            //     this.setState({ status: response.status, profile, myFriends });
            // } catch (e) {
            //     this.setState({ status: 'err' });
            // }
        });
    }

    componentClicked = (event) => {
        // FB.login(function(response) {
        //     console.log(response)
        // }, {scope: ['user_friends']});

    }

    render() {
        return (
            <div className="container-fluid">
                <h2>Login with Facebook or your Split the Bill account</h2>

                <div className="form-group">
                <h3>Username</h3>
                <input placeholder="Username" className="form-control"/>
                </div>

                <div className="form-group">
                <h3>Password</h3>
                <input placeholder="Password" className="form-control"/>
                </div>

                <div className="form-group">
                <button className="btn btn-block btn-info">Login</button>
                </div>


                <FacebookLogin
                appId="2260374724192830"
                autoLoad={false}
                fields="name,email,picture,friends"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
                />

                <div className="form-group">
                <a>Don't have an account? Get started </a>
                    <Link to={`/register`}>here.</Link>
                </div>
            </div>
        )
    }
}