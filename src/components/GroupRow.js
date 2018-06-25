import React from 'react';
import { Link } from 'react-router-dom'

export default class GroupRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id:'',
            userId: '',
            userRole: ''
        }
    }

    setParam(props) {
        console.log(props)
        var param = props.info
        this.setState({id: param.id, userRole: props.userRole, userId: props.userId})
    }

    componentDidMount() {
        this.setParam(this.props)
    }

    routeToGroupPage() {
        if(this.props.userRole == 'admin') {
            return `/user/${this.props.userId}/group/${this.props.info.id}`
        }
        else {
            return `/user/0/group/${this.props.info.id}`
        }
    }

    render() {
        return (
            <tr>
                <td>
                    <Link to={this.routeToGroupPage()}>
                        {this.props.info.name}
                    </Link>
                </td>
                <td hidden={this.state.userRole == 'admin'}>
                    Owned by {this.getOwner()}
                </td>
                <td>
                    <span className="float-right">
                        <button onClick={() =>
                        {this.props.delete(this.props.info.id, this.props.userRole)}}
                                className="btn btn-outline-dark">
                        <i className="fa fa-remove"></i>
                        </button>
                    </span>

                </td>
            </tr>

        )
    }

    getOwner() {
        return this.props.info.admin.username
    }
}