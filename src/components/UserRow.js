import React from 'react';
import { Link } from 'react-router-dom'

export default class UserRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id:'',
            info: {}
        }
    }

    componentDidMount() {
        this.setParam(this.props)
    }

    setParam(props) {
        console.log(props)
        var param = props.info
        this.setState({id: param.id, info: param})
    }

    render() {
        console.log(this.state)
        return (
            <tr className="template">
                <td className="id">{this.state.info.id}</td>
                <td className="username">{this.state.info.username}</td>
                <td className="password">{this.state.info.password}</td>
                <td className="email">{this.state.info.email}</td>
                <td className="phone">{this.state.info.phone}</td>
                <td className="role">{this.state.pictureURL}</td>

                <td>
                    <button className="deleteBtn btn btn-danger">
                        <i className="fas fa-trash"></i>
                        Delete
                    </button>
                </td>
                <td>
                    <button className="editBtn btn btn-danger"
                            onClick={() => window.location.href = '/user/' + this.props.info.id + '/profile'}>
                        <i className="fas fa-user-edit"></i>
                        Edit
                    </button>
                </td>

            </tr>

        )
    }

}