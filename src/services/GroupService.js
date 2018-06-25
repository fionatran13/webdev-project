let _singleton = Symbol();
const REMOTE_URL = 'https://split-the-bill-server.herokuapp.com'
const LOCAL_URL = 'http://localhost:8080'
export const GROUP_API_URL = REMOTE_URL + '/api/group';
const GROUP_USER_URL = REMOTE_URL + '/api/user/UID/group'
const GROUP_USERROLE_URL = REMOTE_URL + '/api/user/UID/USER_ROLE/group'


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
        return fetch(GROUP_API_URL)
            .then(function(response) {
                return response.json();
            })
    }

    findAllGroupsForUser(uid) {
        return fetch(GROUP_USER_URL.replace('UID', uid))
            .then(function (response) {
                return response.json();
            });
    }

    findAllGroupsByUserRole(userRole, uid) {
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
        return fetch(GROUP_API_URL + '/' + groupId + '/members')
            .then(function (response) {
                return response.json();
            })
    }

    updateMembers(groupId, members) {
        return fetch(GROUP_API_URL + '/' + groupId + '/members',
            {
                body: JSON.stringify(members),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            }).then(function (response) {
                // console.log(response.json())
            return (response.json());
        })
    }

    addMemberByIdToGroup(groupId, memberId) {
        const url = GROUP_API_URL +  '/' + groupId + '/newMember/' + memberId
        return fetch(url,
            {
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }
}