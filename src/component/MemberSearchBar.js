import React from 'react';
import { Link } from 'react-router-dom'
import GroupService from "../services/GroupService";
import GroupRow from "./GroupRow";
import {TAM_ID} from "../index";
import FacebookService from "../services/FacebookService";

export default class MemberSearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: TAM_ID,
            searchInp: '',
            list: [],
            query: []
        }
        this.titleChanged = this.titleChanged.bind(this)
    }

    componentDidMount() {
        this.setParams(this.props)
    }

    setParams(props) {
        this.setState({id: props.uid, list: props.friends})
    }

    titleChanged(event) {
        this.setState({
            searchInp: event.target.value
        });
        this.filterList(event.target.value)
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
                               placeholder="Find registered users by email"/></th>
                </tr>
                </thead>
                <tbody>
                {this.renderQuery()}
                </tbody>
            </table>

        )
    }
}