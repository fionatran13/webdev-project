let _singleton = Symbol();

export default class GroupService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new GroupService(_singleton);
        return this[_singleton]
    }

    findAllMembersForGroup(groupId) {
        return fetch('http:localhost:8080/api/group/' + groupId + '/members')
            .then(function(response) {
                return response.json();
            })
    }

    updateMembers(groupId, members) {
        return fetch('http:localhost:8080/api/group/' + groupId + '/members',
            {
                body:JSON.stringify(members),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            })
            .then(function(response) {
                return response.json();
            })
    }

}