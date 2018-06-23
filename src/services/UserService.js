let _singleton = Symbol();
export const REMOTE_URL = 'https://split-the-bill-server.herokuapp.com'
export const LOCAL_URL = 'http://localhost:8080'
const USER_API = LOCAL_URL + '/api/user';
const UID_URL = LOCAL_URL + '/api/user/UID'


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
        return fetch(USER_API)
            .then(function (response) {
                return response.json();
            });
    }

    findUserByID(id) {
        return fetch(UID_URL.replace('UID', id))
            .then(function (response) {
                return response.json();
            });
    }
}