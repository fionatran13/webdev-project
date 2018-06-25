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
            expenses: [],
            anonymous: this.props.anonymous
        };
        this.setGroupId = this.setGroupId.bind(this);
        this.setNote = this.setNote.bind(this);
        this.setExpenses = this.setExpenses.bind(this);
        this.addExpense = this.addExpense.bind(this);
        this.deleteExpense = this.deleteExpense.bind(this);
    }

    componentDidMount() {
        this.setGroupId(this.props.groupId);
        this.findAllExpensesForGroup(this.props.groupId);
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
        this.expenseService
            .findAllExpensesForGroup(groupId)
            .then((expenses) => {
                this.setExpenses(expenses)
            })
    }

    addExpense() {
        window.location.href = '/group/' + this.state.groupId + '/expense'
    }

    deleteExpense(id) {
        this.expenseService
            .deleteExpense(id)
            .then(() => {
                this.findAllExpensesForGroup(this.state.groupId)
            });
    }

    renderExpenses() {
        let items = this.state.expenses.map((expense) => {
            return <ExpensesListItem groupId={this.state.groupId}
                                    info={expense}
                                    delete={this.deleteExpense}
                                    anonymous={this.state.anonymous}/>
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
                            onClick={this.addExpense}
                            hidden={this.state.anonymous}>
                        Add new expense
                    </button>
            </div>
        )
    }
}