/* global FB */
let _singleton = Symbol();


export default class FacebookService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FacebookService(_singleton);
        return this[_singleton]
    }

    // getFriends(id) {
    //     return FB.api(
    //         '/' + id + '/friends',
    //         'GET',
    //         {},
    //         function(response) {
    //             // Insert your code here
    //             console.log(response);
    //         }
    //     );
    // }
}

