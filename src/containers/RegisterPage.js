import React from 'react';
import {Link} from 'react-router-dom';


export default class RegisterPage extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <h2>Register for a new account</h2>

                <div className="form-group">
                    <h3>Username</h3>
                    <input placeholder="Username" className="form-control"/>
                </div>

                <div className="form-group">
                    <h3>Password</h3>
                    <input placeholder="Password" className="form-control"/>
                </div>

                <div className="form-group">
                    <h3>Verify Password</h3>
                    <input placeholder="Password" className="form-control"/>
                </div>

                <div className="form-group">
                    <button className="btn btn-block btn-info">Create</button>
                </div>

                <div className="form-group">
                    <a>Already have an account? Sign in </a>
                    <Link to={`/login`}>here.</Link>
                </div>
            </div>
        )
    }
}