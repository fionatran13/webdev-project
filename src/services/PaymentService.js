let _singleton = Symbol();

export default class PaymentService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new PaymentService(_singleton);
        return this[_singleton]
    }

    getAllDueByGroup(groupId) {
        return fetch('http://localhost:8080/api/group/' + groupId + '/due')
            .then(function (response) {
                return response.json();
            })
    }

    calculateCurrentDues(groupId) {
        return fetch('http://localhost:8080/api/group/' + groupId + '/due/calculate',
            {
                body: JSON.stringify(expense),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(function (response) {
                return response.json();
            })
    }

}