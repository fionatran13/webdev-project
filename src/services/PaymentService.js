import {GROUP_API_URL} from "./GroupService";
import {LOCAL_URL, REMOTE_URL} from "./UserService";

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
        var url = REMOTE_URL + '/api/group/' + groupId + '/due'
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
    }

    calculateCurrentDues(groupId) {
        return fetch(GROUP_API_URL + '/' + groupId + '/due/calculate',
            {
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(function (response) {
                return response.json();
            })
    }

}