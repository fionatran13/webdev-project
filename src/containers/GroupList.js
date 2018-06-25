import React from 'react';
import GroupService from "../services/GroupService";
import GroupRow from "../components/GroupRow";

export default class GroupList extends React.Component {
    constructor() {
        super();
        this.groupService = GroupService.instance;
        this.state = {
            userRole: '',
            userId: '',
            newGroup: {name: ''},
            list: []
        };
        this.setParams = this.setParams.bind(this)
        this.titleChanged = this.titleChanged.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.createGroupForUser = this.createGroupForUser.bind(this);

    }

    componentDidMount() {
        console.log(this.props.userRole)
        this.setState({userId: this.props.userId, userRole: this.props.userRole})
        // this.setParams(this.props)
        this.fetchList()
    }

    setParams(params) {
        this.setState({userId: params.userId, userRole: params.userRole})
    }


    renderGroupList() {
        let list = null;
        var self = this;
        if (this.state.userId != '' && this.state.userRole != '') {
            list = this.state.list.map(
                function (item) {
                    return <GroupRow key={item.id + item.name}
                                     info={item}
                                     userId={self.state.userId}
                                     delete={self.deleteGroup}
                                     userRole={self.state.userRole}
                                     selected={false}/>
                }
            )
        }
        return (
            list
        )
    }

    renderInstruction() {
        if(this.state.userRole == 'systemAdmin') {
            return <div className="alert alert-success" role="alert">
                <strong>You can view group information, create and delete groups</strong>
            </div>
        }
        else if(this.state.userRole == 'admin') {
            return (<div className="alert alert-success" role="alert">
                <strong>Create group as admin</strong>
            </div>)
        } else {
            return (<div className="alert alert-success" role="alert">
                Request a group admin to add you to a group as a member
            </div>)
        }

    }

    renderTitle() {
        if(this.state.userRole == 'systemAdmin') {
            return <div>All Groups in Database</div>
        }
        else {
            return <div>Groups you are in as {this.state.userRole}</div>
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h2 className="text-center text-uppercase text-secondary mb-0">
                        {this.renderTitle()}
                    </h2>
                </div>
                {this.renderInstruction()}
                <table className="table">
                    <thead>
                    <tr hidden={this.state.userRole != 'admin'}>
                        <th><input onChange={this.titleChanged}
                                   className="form-control" id="titleFld"
                                   placeholder="Create a group"/></th>
                        <th>
                            <button onClick={this.createGroupForUser}
                                    className="btn btn-primary">
                                <i className="fa fa-plus"></i>
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderGroupList()}
                    </tbody>
                </table>
            </div>
        )
    }

    fetchList() {
        if(this.props.userRole == 'systemAdmin') {
            this.groupService
                .findAllGroups()
                .then((list) => {
                    this.setState({list: list});
                })
        } else {
            this.groupService
                .findAllGroupsByUserRole(this.props.userRole, this.props.userId)
                .then((list) => {
                    this.setState({list: list});
                })
        }
    }

    titleChanged(event) {
        this.setState({
            newGroup: {name: event.target.value}
        });
    }

    createGroupForUser() {
        if (this.state.newGroup.name === "") {
            alert("Please enter group name");
        }
        else {
            this.groupService
                .createGroupForUser(this.state.userId, this.state.newGroup)
                .then((response) => {
                    this.fetchList();
                });
        }

    }

    deleteGroup(id, userRole) {
        if (userRole == 'admin') {
            this.groupService
                .deleteGroup(id)
                .then(() => {
                    this.fetchList();
                });
        }
        else {
            alert('remove user as member from group ' + id)
        }
    }

}
