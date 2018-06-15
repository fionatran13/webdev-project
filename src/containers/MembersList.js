import React from 'react';
import ReactDOM from 'react-dom';
import MembersListItem from "../components/MembersListItem";
import GroupService from "../services/GroupService";

export default class MembersList extends React.Component {
    constructor(props) {
        super(props);
        this.groupService = GroupService.instance;
        this.state = {
            groupId: 0,
            member: {username: ''},
            members: []
        };
        this.setGroupId = this.setGroupId.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setMembers = this.setMembers.bind(this);
        this.addMember = this.addMember.bind(this);
        this.deleteMember = this.deleteMember.bind(this);
    }

    componentDidMount() {
        this.setGroupId(this.props.groupId);
    }

    setGroupId(groupId) {
        this.setState({groupId: groupId});
    }

    setUsername(event) {
        this.setState({
            member: {
                username: event.target.value
            }
        })
    }

    setMembers(members) {
        this.setState({members: members});
    }

    findAllMembersForGroup(groupId) {
        this.groupService
            .findAllMembersForGroup(groupId)
            .then((members) => {
                this.setMembers(members)
            })
    }

    addMember() {
        this.state.members.push(this.state.member.username);
        this.groupService
            .updateMembers(this.state.groupId, this.state.members)
            .then(() => {
                this.findAllMembersForGroup(this.state.groupId);
            });
    }

    deleteMember(username) {
        for (var i=0; i < this.state.members.length; i++) {
            if(this.state.members[i].username === username) {
                this.state.members.splice(i, 1)
            }
        }

        this.groupService
            .updateMembers(this.state.groupId, this.state.members)
            .then(() => {
                this.findAllMembersForGroup(this.state.groupId)
            });
    }

    renderMembers() {
        let items = this.state.members.map((member) => {
            return <MembersListItem groupId={this.state.groupId}
                                    username={member.username}
                                    delete={this.deleteMember}/>
        })
        return items;
    }

    render() {
        return (
            <div>
                <h1>Members</h1>
                <ul className="list-group">
                    {this.renderMembers()}
                </ul>
                <form>
                    <div className="input-group">
                        <input className="form-control mr-sm-1"
                               placeholder="New member"
                               value={this.state.member.username}
                               onChange={this.setUsername}/>
                        <span className="input-group-btn">
                    <button id="addBtn"
                            type="button"
                            className="btn"
                            onClick={this.addMember}>
                        <i className="fa fa-plus"></i>
                    </button>
                    </span>
                    </div>
                </form>
            </div>
        )
    }
}