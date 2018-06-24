import React, {Component} from 'react';
import MembersList from './MembersList';
import ExpensesList from './ExpensesList';
import PaymentDueList from './PaymentDueList';
import SearchBar from "../components/SearchBar";
import MemberSearchBar from "../components/MemberSearchBar";


export default class GroupPage extends React.Component {
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
                        <ExpensesList/>
                    </div>
                    <div className="col-4">
                        <PaymentDueList/>
                    </div>
                </div>
            </div>
        )
    }

}