import React from 'react'

export default class ExpensesListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="list-group-item">
               Expense: {this.props.info.note} - {this.props.info.expenser.username} ({this.props.info.ammount})
                <span className="float-right">
                    <button type="button" className="btn"
                            onClick={() => this.props.delete(this.props.info.id)}
                            hidden={this.props.anonymous}>
                        <i className="fa fa-trash"></i>
                    </button>
                </span>
            </li>
        )
    }


}