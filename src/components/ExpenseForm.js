import React from 'react';
import MemberSearchBar from "./MemberSearchBar";
import ExpenseService from "../services/ExpenseService";

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // userId: 0,
            groupId: 0,
            amount: '',
            expenseType: 'Other',
            note: '',
            due: '',
            expenser: ''
        }

        this.service = ExpenseService.instance;
        // this.setUserId = this.setUserId.bind(this);
        this.setGroupId = this.setGroupId.bind(this);
        this.setAmount = this.setAmount.bind(this);
        this.setNote = this.setNote.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setType = this.setType.bind(this);
        this.setExpenser = this.setExpenser.bind(this);

    }

    componentDidMount() {
        this.setGroupId(this.props.match.params.groupId);
        // this.setUserId(this.props.userId);
    }

    // setUserId(userId) {
    //     this.setState({userId: userId})
    // }

    setGroupId(groupId) {
        this.setState({groupId: groupId});
    }

    setAmount(event) {
        this.setState({
            amount: event.target.value
        })
    }

    setNote(event) {
        this.setState({
            note: event.target.value
        })
    }

    setDate(event) {
        this.setState({
            due: event.target.value
        })
    }

    setType(event) {
        this.setState({
            expenseType: event.target.value
        })
    }

    setExpenser(event) {
        this.setState({
            expenser: event.target.value
        })
    }

    createExpense() {
        var expense =
            {
                ammount: this.state.amount,
                expenseType: this.state.expenseType,
                note: this.state.note,
                expenseDate: this.state.due
            }
        if (expense.ammount != ''
            && expense.expenseType != ''
            && this.state.expenser != '') {
            this.service
                .addExpenseToGroup(this.state.groupId, this.state.expenser, expense)
                .then(alert('added'))
        } else {
            console.log(expense)
            alert('missing information for expense')
        }

    }

    render() {
        return (
            <div className="container-fluid">
                <h2>Create an Expense</h2>
                <div className="form-group">
                    <h3>Amount</h3>
                    <input placeholder="20" className="form-control"
                           onChange={this.setAmount}/>
                </div>

                <div className="form-group">
                    <h3>Expenser</h3>
                    <input placeholder="20" className="form-control"
                           onChange={this.setExpenser}/>
                    {/*<MemberSearchBar/>*/}
                </div>

                <div className="form-group">
                    <h3>Expense Type</h3>
                    <select className="form-control" onChange={this.setType}>
                        <option value="Accommodation">Accommodation</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Other" selected>Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <h3>Note</h3>
                    <input placeholder="Title or Description" className="form-control"
                           onChange={this.setNote}/>
                </div>

                <div className="form-group">
                    <h3>Expense Date</h3>
                    <input placeholder="mm/dd/yyyy" className="form-control"
                           onChange={this.setDate}/>
                </div>

                <div className="form-group">
                    <button className="btn btn-block btn-info"
                            onClick={() => this.createExpense()}>Create
                    </button>
                </div>
            </div>
        )
    }
}