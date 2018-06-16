import React from 'react'

export default class ExpensesListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="list-group-item">
                {this.props.note}
                <span className="float-right">
                    <button type="button" className="btn"
                            onClick={() => this.props.delete(this.props.expense.id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </span>
            </li>
        )
    }


}