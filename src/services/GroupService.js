let _singleton = Symbol();
export const REMOTE_URL = 'https://split-the-bill-server.herokuapp.com'
export const LOCAL_URL = 'http://localhost:8080'
const GROUP_API_URL = LOCAL_URL + '/api/group';
const GROUP_USER_URL = LOCAL_URL + '/api/user/UID/group'
const GROUP_USERROLE_URL = LOCAL_URL + '/api/user/UID/USER_ROLE/group'


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

    findAllGroups() {
        return fetch(LOCAL_URL + '/api/group')
            .then(function(response) {
                return response.json();
            })
    }

    findAllGroupsForUser(uid) {
        console.log(GROUP_USER_URL.replace('UID', uid))
        return fetch(GROUP_USER_URL.replace('UID', uid))
            .then(function (response) {
                return response.json();
            });
    }

    findAllGroupsByUserRole(userRole, uid) {
        console.log(GROUP_USERROLE_URL.replace('UID', uid).replace('USER_ROLE', userRole))
        return fetch(GROUP_USERROLE_URL.replace('UID', uid).replace('USER_ROLE', userRole))
            .then(function (response) {
                return response.json();
            });
    }

    findGroupByID(id) {
        return fetch(GROUP_API_URL + '/' + id)
            .then(function (response) {
                return response.json();
            });
    }

    createGroupForUser(uid, group) {
        return fetch(GROUP_USER_URL.replace('UID', uid), {
            body: JSON.stringify(group),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteGroup(id) {
        return fetch(GROUP_API_URL + '/' + id, {
            method: 'DELETE'
        })
    }


    findAllMembersForGroup(groupId) {
        return fetch('http:localhost:8080/api/group/' + groupId + '/members')
            .then(function (response) {
                return response.json();
            })
    }

    updateMembers(groupId, members) {
        return fetch('http:localhost:8080/api/group/' + groupId + '/members',
            {
                body: JSON.stringify(members),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            })
            .then(function (response) {
                return response.json();
            })
    }

    addMemberByIdToGroup(groupId, memberId) {
        const url = GROUP_API_URL +  '/' + groupId + '/newMember/' + memberId
        console.log(url)
        return fetch(url,
            {
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            console.log(response);
        })
    }
}