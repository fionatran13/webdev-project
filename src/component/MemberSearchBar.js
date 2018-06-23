import React from 'react';
import { Link } from 'react-router-dom'
import GroupService from "../services/GroupService";
import GroupRow from "./GroupRow";
import {TAM_ID} from "../index";
import FacebookService from "../services/FacebookService";
import FBsugestBar from "./FBsugestBar";
import UserService from "../services/UserService";

export default class MemberSearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friends: {},
            id: TAM_ID,
            searchInp: '',
            list: [],
            query: []
        }
        this.service = UserService.instance;
        this.titleChanged = this.titleChanged.bind(this)
    }

    componentDidMount() {
        this.setParams(this.props)
        this.fetchList()
    }

    setParams(props) {
        this.setState({id: props.user.id, friends: props.friends})
    }

    titleChanged(event) {
        this.setState({
            searchInp: event.target.value
        });
        this.filterList(event.target.value)
    }

    fetchList() {
        this.service
            .findAllRegisteredUsers()
            .then(response => console.log(response))
    }

    filterList(input) {
        if(input == '') {
            this.setState({query: []})
        } else {
            var filteredList = this.state.list.filter(item => (
                item.name.includes(input)
            ))
            console.log(filteredList)
            this.setState({query: filteredList})
        }
    }

    renderQuery() {
        if(this.state.searchInp != '' && this.state.query.length === 0) {
            return (<tr>Results not found</tr>)
        }
        else {
            let list = null;
            if (this.state.id != '') {
                list = this.state.query.map(
                    function (item) {
                        return <tr key={item.id}>{item.name}</tr>
                    }
                )
            }
            return (
                list
            )
        }
    }

    suggestFacebookFriends() {
        if(Array.isArray(this.state.friends)) {
            return (<FBsugestBar friends={this.state.friends}/>)
        }
    }

    render() {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>
                        <button className="btn">
                            <i className="fa fa-search"></i>
                        </button>
                    </th>
                    <th><input onChange={this.titleChanged}
                               className="form-control" id="titleFld"
                               placeholder="Find by username"/></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {this.suggestFacebookFriends()}
                </tr>
                {this.renderQuery()}
                </tbody>
            </table>

        )
    }
}