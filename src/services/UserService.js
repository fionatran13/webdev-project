let _singleton = Symbol();

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

    createUser(user, fbId) {
        return fetch('http://localhost:8080/api/user/' + fbId, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    findUserById(userId) {
        return fetch('http://localhost:8080/api/user/' + userId)
            .then(function(response) {
                console.log(response)
            })
    }

    findFBUserById(fbId) {
        return fetch('http://localhost:8080/api/fbuser/' + fbId)
            .then(function(response) {
                console.log(response)
            })
    }

    findUserByUsername(username) {
        return fetch('http://localhost:8080/api/username/' + username)
            .then(function(response) {
                return response.json();
            })
    }

    login(user) {
        return fetch('http://localhost:8080/api/login', {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }
}