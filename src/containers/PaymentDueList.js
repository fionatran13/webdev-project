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
        console.log(this.props)
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
                console.log(payments)
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
            <div className="table-responsive">
                <h2>Payments Due</h2>
                <table className="table-bordered">
                    <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount Due</th>
                    </tr>

                    </thead>
                    <tbody>
                    {this.renderPayments()}
                    </tbody>
                </table>
            </div>
        )
    }
}