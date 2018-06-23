import React from 'react'
import FacebookLogin from 'react-facebook-login';


export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
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
                //onClick={componentClicked}
                //callback={responseFacebook}
                />

                <h3>Don't have an account? Get started here.</h3>
            </div>
        )
    }
}