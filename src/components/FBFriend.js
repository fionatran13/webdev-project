import React from 'react'
import fb_logo from '../1400.jpg'

export default class FBFriend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {friend: {}}
    }

    componentDidMount() {
        this.setState({friend: this.props.friend})
    }

    viewProfile(id) {
        window.location.href = '/user/' + id + '/profile/view'
    }

    render() {
        return (
            <div className="card" onClick={() => this.viewProfile(this.props.friend.id)}>
                <img className="card-img-top"
                     src={fb_logo}
                     alt="Profile picture">
                </img>
                <div className="card-body">
                    <p className="card-text">{this.state.friend.name}</p>
                </div>
            </div>
        )
    }


}