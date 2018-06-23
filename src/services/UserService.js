let _singleton = Symbol();
export const REMOTE_URL = 'https://split-the-bill-server.herokuapp.com'
export const LOCAL_URL = 'http://localhost:8080'
const USER_API = LOCAL_URL + '/api/user';
const GROUP_USER_URL = LOCAL_URL + '/api/user/UID/group'
const GROUP_USERROLE_URL = LOCAL_URL + '/api/user/UID/USER_ROLE/group'


export default class UserService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton]
    }


    findAllRegisteredUsers() {
        return fetch(GROUP_USER_URL.replace('UID', uid))
            .then(function (response) {
                return response.json();
            });
    }

    findGroupByID(id) {
        return fetch(USER_API + '/' + id)
            .then(function (response) {
                return response.json();
            });
    }
}