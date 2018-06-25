import React from 'react'

export default class ExpensesListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
                <tr>
                    <td>{this.props.info.from.username}</td>
                    <td>{this.props.info.to.username}</td>
                    <td>${this.props.info.ammountDue}</td>
                </tr>
        )
    }
}