import React, {Component} from 'react';
import MembersList from './MembersList';
import ExpensesList from './ExpensesList';
import PaymentDueList from './PaymentDueList';
import SearchBar from "../components/SearchBar";
import MemberSearchBar from "../components/MemberSearchBar";


export default class GroupPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {groupId: ''}
    }

    componentDidMount() {
        this.setState({groupId: this.props.match.params.groupId})
    }

    renderExpenses() {
        if(this.state.groupId != '') {
            return(<ExpensesList groupId={this.state.groupId}/>)
        }
    }
    render() {
        return (
            <div>
                <h1>Group Page</h1>
                {/*<MemberSearchBar/>*/}
                <div className="row">
                    <div className="col-4">
                        <MembersList/>
                    </div>
                    <div className="col-4">
                        {this.renderExpenses()}
                    </div>
                    <div className="col-4">
                        <PaymentDueList/>
                    </div>
                </div>
            </div>
        )
    }

}