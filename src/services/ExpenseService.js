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
        return fetch('http:localhost:8080/api/group/' + groupId + '/expense')
            .then(function (response) {
                return response.json();
            })
    }

    addExpenseToGroup(groupId, userId, expense) {
        return fetch('http:localhost:8080/api/user/' + userId + '/group/' + groupId + '/expense',
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
        return fetch('http:localhost:8080/api/expense/' + expenseId,
            {
                method: 'delete'
            })
    }

}