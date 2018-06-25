import React from 'react';
import {Link} from 'react-router-dom'
import {TAM_ID} from "../index";
import FBsugestBar from "./FBsugestBar";
import UserService from "../services/UserService";
import GroupService from "../services/GroupService";
import FBFriend from "./FBFriend";

export default class MemberSearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gid: '',
            friends: {},
            id: '',
            selectedMId: '',
            searchInp: '',
            list: [],
            query: []
        }
        this.groupService = GroupService.instance;
        this.service = UserService.instance;
        this.titleChanged = this.titleChanged.bind(this)
        this.selectMember = this.selectMember.bind(this)
    }

    componentDidMount() {
        this.setParams(this.props)
        this.fetchList()
    }

    setParams(props) {
        this.setState({id: props.user.id, friends: props.friends, gid: props.gid})
    }

    selectMember(id) {
        this.setState({selectedMId: id})
        this.service
            .findUserByID(id)
            .then(response => this.setState({searchInp: response.username}))
    }

    addMemberToGroup() {
        if(this.state.selectedMId == '') {
            alert('No user selected!')
        } else {
            alert('adding ' + this.state.selectedMId + ' to group ' + this.state.gid)
            this.groupService
                .addMemberByIdToGroup(this.state.gid, this.state.selectedMId)
                .then(response => this.handleAdd(response))
        }
    }

    handleAdd(response) {
        if(response.status === 500) {
            alert('Member already in group!')
        } else {
            alert('Refresh group page to see updates')
        }
    }

    titleChanged(event) {
        this.setState({
            searchInp: event.target.value
        });
        this.filterList(event.target.value)
    }

    fetchList() {
        this.service
            .findAllUsers()
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
                        return (
                            <div>
                            <tr key={item.id} onClick={() => self.selectMember(item.id)}>
                            <Link to={"/user/" + item.id + '/profile/anonymous'}>
                                [ID: {item.id}] Username: {item.username}
                            </Link>
                                <button>Select</button>
                            </tr>
                            </div>)
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
            return (<FBsugestBar friends={this.state.friends} select={this.selectMember}/>)
        }
    }

    createDialog() {
        return(<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Adding user {this.state.selectedMId} to group {this.state.gid}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={() => this.addMemberToGroup()}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>)
    }

    render() {
        return (
            <div>
                {this.createDialog()}


                <table className="table">


                    <thead>
                    <tr>
                        <th>
                            <button className="btn">
                                <i className="fa fa-search"></i>
                            </button>
                        </th>
                        <th><input onChange={this.titleChanged}
                                   value={this.state.searchInp}
                                   className="form-control" id="titleFld"
                                   placeholder="Find by username"/>
                        </th>
                        <th>
                            <button hidden={this.props.mode !== undefined}
                                    className="btn"
                                    data-toggle="modal"
                                    data-target="#exampleModal">
                                <i className="fa fa-plus"></i>
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>
                            {this.suggestFacebookFriends()}
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>
                            {this.renderQuery()}
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>


        )
    }
}