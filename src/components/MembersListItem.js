import React from 'react'

export default class MembersListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="list-group-item">
                {this.props.username}
                <span className="float-right">
                    <button type="button" className="btn"
                            onClick={() => this.props.delete(this.props.username)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </span>
            </li>
        )
    }


}