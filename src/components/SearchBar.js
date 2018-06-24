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
            query: []
        }
        this.titleChanged = this.titleChanged.bind(this)
    }

    componentDidMount() {
        console.log('id' + this.props.id)
        this.setParams(this.props.id)
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
                        return <tr key={item.id}>{item.name}</tr>
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