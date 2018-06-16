import React from 'react';
import GroupService from "../services/GroupService";
import ExpenseService from "../services/ExpenseService";


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
        // this.state.expenses.push(this.state.expenses.note);
        // this.groupService
        //     .updateExpenses(this.state.groupId, this.state.expenses)
        //     .then(() => {
        //         this.findAllExpensesForGroup(this.state.groupId);
        //     });
    }

    deleteExpense() {
        this.expenseService
            .deleteExpense(this.state.groupId, this.state.expense.id)
            .then(() => {
                this.findAllMembersForGroup(this.state.groupId)
            });
    }
}