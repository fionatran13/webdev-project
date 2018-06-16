import React from 'react';
import { Link } from 'react-router-dom'

export default class GroupRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id:'',
            userRole: ''
        }
    }

    setParam(props) {
        var param = props.info
        this.setState({id: param.id, userRole: props.userRole})
    }

    componentDidMount() {
        this.setParam(this.props)
    }

    render() {
        return (
            <tr>
                <td>
                    <Link to={`/group/${this.props.info.id}`}>
                        {this.props.info.name}
                    </Link>
                </td>
                <td hidden={this.state.userRole == 'admin'}>
                    Owned by {this.getOwner()}
                </td>
                <td>
                    <span className="float-right">
                        <button onClick={() =>
                        {this.props.delete(this.props.info.id)}}
                                className="btn btn-outline-dark">
                        <i className="fa fa-remove"></i>
                        </button>
                    </span>

                </td>
            </tr>

        )
    }

    getOwner() {
        console.log()
        return this.props.info.admin
    }
}