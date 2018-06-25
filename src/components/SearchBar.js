import React from 'react';
import { Link } from 'react-router-dom'
import GroupService from "../services/GroupService";
import GroupRow from "./GroupRow";

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.groupService = GroupService.instance;
        this.state = {
            id:'',
            searchGroupName: '',
            list: [],
            query: [],
            anonymous: this.props.anonymous
        }
        this.titleChanged = this.titleChanged.bind(this)
    }

    componentDidMount() {
        this.setParams(this.props.id)
        // this.setState({anonymous: this.props.anonymous})
        this.fetchList()
    }

    setParams(id) {
        this.setState({id: id})
    }

    titleChanged(event) {
        this.setState({
            searchInp: event.target.value
        });
        this.filterList(event.target.value)
    }

    fetchList() {
        if (this.state.id != '') {
            this.groupService
                .findAllGroupsForUser(this.state.id)
                .then((list) => {
                    this.setState({list: list});
                })
        }
        if(this.state.anonymous === true) {
            this.groupService
                .findAllGroups()
                .then((res) => {
                    this.setState({list: res});
                })
        }
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
        if(this.state.searchGroupName != '' && this.state.query.length === 0) {
            return (<tr>Results not found</tr>)
        }
        else {
            let list = null;
            if (this.state.id != '') {
                list = this.state.query.map(
                    function (item) {
                        return <tr key={item.id}>
                            <Link to={`/user/0/group/` + item.id}>{item.name}</Link>
                            </tr>
                    }
                )
            }
            return (
                list
            )
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
                               placeholder="Find by group name"/></th>
                </tr>
                </thead>
                <tbody>
                {this.renderQuery()}
                </tbody>
            </table>

        )
    }
}