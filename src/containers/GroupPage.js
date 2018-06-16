import React, {Component} from 'react';
import MembersList from './MembersList';
import ExpensesList from './ExpensesList';
import PaymentDueList from './PaymentDueList';


export default class GroupPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Group Page</h1>
                <div className="row">
                    <div className="col-2">
                        <MembersList/>
                    </div>
                    <div className="col-5">
                        <ExpensesList/>
                    </div>
                    <div className="col-5">
                        <PaymentDueList/>
                    </div>
                </div>
            </div>
        )
    }

}