import {LOCAL_URL} from "./UserService";
const GROUP_API = LOCAL_URL + '/api/group'
const USER_API = LOCAL_URL + '/api/user'
const EXPENSE_API = LOCAL_URL + '/api/expense'


let _singleton = Symbol();

export default class ExpenseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ExpenseService(_singleton);
        return this[_singleton]
    }

    findAllExpensesForGroup(groupId) {
        return fetch(GROUP_API + groupId + '/expense')
            .then(function (response) {
                return response.json();
            })
    }

    addExpenseToGroup(groupId, userId, expense) {
        return fetch(USER_API + userId + '/group/' + groupId + '/expense',
            {
                body: JSON.stringify(expense),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(function (response) {
                return response.json();
            })
    }

    deleteExpense(expenseId) {
        return fetch(EXPENSE_API + expenseId,
            {
                method: 'delete'
            })
    }

}