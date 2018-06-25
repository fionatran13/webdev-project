import React from 'react'
import PaymentService from "../services/PaymentService";
import PaymentDueListItem from "../components/PaymentDueListItem";

export default class PaymentDueList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            groupId: 0,
            payments: []
        };

        this.paymentService = PaymentService.instance;

        this.renderPayments = this.renderPayments.bind(this)
    }

    componentDidMount() {
        this.setGroupId(this.props.groupId);
        this.findAllPaymentsForGroup(this.props.groupId);
    }

    setGroupId(groupId) {
        this.setState({groupId: groupId});
    }

    setPayments(payments) {
        this.setState({payments: payments});
    }

    findAllPaymentsForGroup(groupId) {
        this.paymentService
            .getAllDueByGroup(groupId)
            .then((payments) => {
                this.setPayments(payments)
            })
    }

    renderPayments() {
        let items = this.state.payments.map((payment) => {
            return <PaymentDueListItem groupId={this.state.groupId}
                                     info={payment}/>
        })
        return items;
    }
    render() {
        return (
            <div>
                <h2>Payments Due</h2>
                <table className="list-group">
                    <thead>
                        <tr>From</tr>
                        <tr>To</tr>
                        <tr>Amount Due</tr>
                    </thead>
                    <tbody>
                    {this.renderPayments()}
                    </tbody>
                </table>
            </div>
        )
    }
}