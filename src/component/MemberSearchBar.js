import React from 'react';
import {TAM_ID} from "../index";
import FBsugestBar from "./FBsugestBar";
import UserService from "../services/UserService";
import GroupService from "../services/GroupService";

export default class MemberSearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gid: '2',
            friends: {},
            id: '',
            selectedMId: '2',
            searchInp: '',
            list: [],
            query: []
        }
        this.groupService = GroupService.instance;
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

    selectMember(id) {
        this.setState({selectedMId: id})
        console.log(this.state.selectedMId)
    }

    addMemberToGroup() {
        alert('adding ' + this.state.selectedMId + ' to group ' + this.state.gid)
        this.groupService
            .addMemberByIdToGroup(this.state.gid, this.state.selectedMId)
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
            .then((list) => {
                this.setState({list: list});
            })
    }

    filterList(input) {
        if(input == '') {
            this.setState({query: []})
        } else {
            var filteredList = this.state.list.filter(item => (
                item.username.includes(input)
            ))
            this.setState({query: filteredList})
        }
    }

    renderQuery() {
        let self = this
        if(this.state.searchInp != '' && this.state.query.length === 0) {
            return (<tr>Results not found</tr>)
        }
        else {
            let list = null;
            if (this.state.id != '') {
                list = this.state.query.map(
                    function (item) {
                        return (<tr key={item.id} onClick={() => self.selectMember(item.id)}>
                            {item.username}</tr>)
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
                               placeholder="Find by username"/>
                    </th>
                    <th>
                        <button className="btn"
                                onClick={() => this.addMemberToGroup()}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </th>
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