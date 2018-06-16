import React, {Component} from 'react';
import MembersList from './MembersList';
import ExpensesList from './ExpensesList';


export default class GroupPage extends Component {
    render() {
        return (
            <div>
                <h1>Group Page</h1>
                <div className="row">
                    <div className="col-4">
                        <MembersList/>
                    </div>
                    <div className="col-8">
                        <ExpensesList/>
                    </div>
                </div>
            </div>
        )
    }

}