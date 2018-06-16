let _singleton = Symbol();
export const REMOTE_URL = 'https://split-the-bill-server.herokuapp.com'
export const LOCAL_URL = 'http://localhost:8080'
const GROUP_API_URL = LOCAL_URL + '/api/group';
const GROUP_USER_URL = LOCAL_URL + '/api/user/UID/group'
const GROUP_USERROLE_URL = LOCAL_URL + '/api/user/UID/USER_ROLE/group'


export default
class GroupService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new GroupService(_singleton);
        return this[_singleton]
    }


    findAllGroupsForUser(uid) {
        return fetch(GROUP_USER_URL.replace('UID', uid))
            .then(function(response){
                return response.json();
            });
    }

    findAllGroupsByUserRole(userRole, uid) {
        return fetch(GROUP_USERROLE_URL.replace('UID', uid).replace('USER_ROLE', userRole))
            .then(function(response){
                return response.json();
            });
    }

    findGroupByID(id) {
        return fetch(GROUP_API_URL + '/' + id)
            .then(function(response){
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

}
