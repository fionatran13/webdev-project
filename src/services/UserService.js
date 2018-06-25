let _singleton = Symbol();
export const REMOTE_URL = 'https://split-the-bill-server.herokuapp.com'
export const LOCAL_URL = 'http://localhost:8080'
const USER_API = LOCAL_URL + '/api/user';
const ADMIN_API = LOCAL_URL + '/api/admin';
const UID_URL = LOCAL_URL + '/api/user/UID'
const FBUSER_URL = LOCAL_URL + '/api/fbuser'
const USERNAME_URL = LOCAL_URL + '/api/username'
const LOGIN_URL = LOCAL_URL + '/api/login'



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


    findAllUsers() {
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


    createAdmin(user) {
        return fetch(ADMIN_API, {
            method: 'post',
            body: JSON.stringify(user), //convert json to string
            headers: {
                'content-type': 'application/json' //notify the server to know the post file is json
            }
        }).then(function(response) {
            return response.json();
        });
    }

    createUser(user, fbId) {
        return fetch(USER_API + fbId, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    findFBUserById(fbId) {
        return fetch(FBUSER_URL + '/' + fbId)
            .then(function(response) {
                return response.json();
            })
    }

    findUserByUsername(username) {
        return fetch(USERNAME_URL + username)
            .then(function(response) {
                return response.json();
            })
    }

    login(user) {
        return fetch(LOGIN_URL, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    updateUser(userId, user) {
        return fetch(USER_API + '/' + userId, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
    }

    getAllExpensesforUser(userId) {
        return fetch(USER_API + '/' + userId + '/expenses')
            .then(function(response) {
                return response.json();
            });
    }

    getAllDuesforUser(userId) {
        return fetch(USER_API + '/' + userId + '/due')
            .then(function(response) {
                return response.json();
            });
    }
}