import React from 'react';
import GroupService from "../services/GroupService";
import ExpenseService from "../services/ExpenseService";
import ExpensesListItem from "../components/ExpensesListItem";


export default class ExpensesList extends React.Component {
    constructor(props) {
        super(props);
        this.groupService = GroupService.instance;
        this.expenseService = ExpenseService.instance;
        this.state = {
            groupId: 0,
            expense: {id: 0, note: ''},
            expenses: []
        };
        this.setGroupId = this.setGroupId.bind(this);
        this.setNote = this.setNote.bind(this);
        this.setExpenses = this.setExpenses.bind(this);
        this.addExpense = this.addExpense.bind(this);
        this.deleteExpense = this.deleteExpense.bind(this);
    }

    componentDidMount() {
        console.log(this.props)
        this.setGroupId(this.props.groupId);
    }

    setGroupId(groupId) {
        this.setState({groupId: groupId});
    }

    setNote(event) {
        this.setState({
            expense: {
                note: event.target.value
            }
        })
    }

    setExpenses(expenses) {
        this.setState({expenses: expenses});
    }

    findAllExpensesForGroup(groupId) {
        this.groupService
            .findAllExpensesForGroup(groupId)
            .then((expenses) => {
                this.setExpenses(expenses)
            })
    }

    addExpense() {
        console.log(this.state.groupId)
        window.location.href = '/group/' + this.state.groupId + '/expense'
    }

    deleteExpense() {
        this.expenseService
            .deleteExpense(this.state.groupId, this.state.expense.id)
            .then(() => {
                this.findAllMembersForGroup(this.state.groupId)
            });
    }

    renderExpenses() {
        let items = this.state.expenses.map((expense) => {
            return <ExpensesListItem groupId={this.state.groupId}
                                    note={expense.note}
                                    delete={this.deleteExpense}/>
        })
        return items;
    }

    render() {
        return (
            <div>
                <h2>Expenses</h2>
                <ul className="list-group">
                    {this.renderExpenses()}
                </ul>
                    <button id="addBtn"
                            type="button"
                            className="btn btn-success"
                            onClick={this.addExpense}>
                        Add new expense
                    </button>
            </div>
        )
    }
}