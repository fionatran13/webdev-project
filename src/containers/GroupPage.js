import React, {Component} from 'react';
import MembersList from './MembersList';
import ExpensesList from './ExpensesList';
import PaymentDueList from './PaymentDueList';
import SearchBar from "../components/SearchBar";
import MemberSearchBar from "../components/MemberSearchBar";
import PaymentService from "../services/PaymentService";


export default class GroupPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {groupId: ''}
        this.payService = PaymentService.instance
    }

    componentDidMount() {
        this.setState({groupId: this.props.match.params.groupId})
    }

    renderExpenses() {
        if(this.state.groupId != '') {
            return(<ExpensesList groupId={this.state.groupId}/>)
        }
    }

    getDue() {
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
                        <button type="button" className="btn btn-warning"
                                onClick={() => this.getDue()}>GET PAYMENT DUE</button>
                        <PaymentDueList/>
                    </div>
                </div>
            </div>
        )
    }

}