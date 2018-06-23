import React from 'react';
import { Link } from 'react-router-dom'
import GroupService from "../services/GroupService";
import GroupRow from "./GroupRow";
import {TAM_ID} from "../index";
import FacebookService from "../services/FacebookService";

export default class FBsugestBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        this.setParams(this.props)
    }

    setParams(props) {
        this.setState({list: props.friends})
    }

    renderList() {
        console.log(this.state.list)

            let list = null;
            list = this.state.list.map(
                function (item) {
                    console.log(item)
                    return <th key={item.id}>{item.name}</th>
                }
            )
            return (
                list
            )
    }

    render() {
        return (
            <div>
                {this.renderList()}
            </div>
            )
    }
}