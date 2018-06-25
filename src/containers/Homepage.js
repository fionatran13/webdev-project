import React from 'react';

export default class Homepage extends React.Component {

    render() {
        return (
            <div class="p-3 mb-2 bg-light text-black">
                <div className="progress">
                    <div className="progress-bar bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="25"
                         aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="progress">
                    <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50"
                         aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="progress">
                    <div className="progress-bar bg-warning" role="progressbar" style={{width: "75%"}} aria-valuenow="75"
                         aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="progress">
                    <div className="progress-bar bg-danger" role="progressbar" style={{width: "100%"}} aria-valuenow="100"
                         aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                <div className="container text-center my-auto">
                <h1>Split the Bill!</h1>

                    <button className="btn btn-secondary btn-lg btn-block"
                            onClick={() => window.location.href='/login'}>Login</button>
                    <button className="btn btn-dark btn-lg btn-block"
                            onClick={() => window.location.href='/register'}>Register</button>
                    <button className="btn btn-secondary btn-lg btn-block"
                            onClick={() => window.location.href='/anonymous'}>Continue without Login</button>
                </div>

                <br/>

                <div className="progress">
                    <div className="progress-bar bg-danger" role="progressbar" style={{width: "100%"}} aria-valuenow="25"
                         aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="progress">
                    <div className="progress-bar bg-warning" role="progressbar" style={{width: "75%"}} aria-valuenow="50"
                         aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="progress">
                    <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="75"
                         aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="progress">
                    <div className="progress-bar bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="100"
                         aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        )
    }
}