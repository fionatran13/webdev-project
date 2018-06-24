import React from 'react';
import {Link} from 'react-router-dom'
import GroupService from "../services/GroupService";
import GroupRow from "./GroupRow";
import {TAM_ID} from "../index";
import FacebookService from "../services/FacebookService";
import FBFriend from "./FBFriend";

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
        let list = null;
        let self = this;
        list = this.state.list.map(
            function (item) {
                return <div onClick={() => self.props.select(item.id)}>
                    <FBFriend key={item.id} friend={item}/>
                </div>
            }
        )
        return (
            list
        )
    }

    render() {
        return (
        <div className="card-deck">
            {this.renderList()}
        </div>
        )
    }
}