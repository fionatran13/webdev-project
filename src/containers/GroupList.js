import React from 'react';
import GroupService from "../services/GroupService";
import GroupRow from "../component/GroupRow";

export default class GroupList extends React.Component {
    constructor() {
        super();
        this.groupService = GroupService.instance;
        this.state = {
            userRole: 'admin',
            userId: '',
            newGroup: {name: ''},
            list: [{name: 'group 1'}]
        };
        this.titleChanged = this.titleChanged.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.createGroupForUser = this.createGroupForUser.bind(this);

    }

    componentDidMount() {
        this.setParams(this.props)
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
                    return <GroupRow key={item.id}
                                     info={item}
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

    render() {
        return (
            <div>
                <div className="container">
                    <h2 className="text-center text-uppercase text-secondary mb-0">
                        Groups you are as {this.state.userRole}
                    </h2>
                </div>
                <table className="table">
                    <thead>
                    <tr>
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
        this.groupService
            .findAllGroupsByUID(this.state.userRole, this.state.userId)
            .then((list) => {
                this.setState({list: list});
            })
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
                .then((response) => {this.fetchList();});
        }

    }

    deleteGroup(id, userRole) {
        if(userRole === 'admin') {
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
