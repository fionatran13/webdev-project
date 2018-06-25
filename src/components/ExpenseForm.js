import React from 'react';
import MemberSearchBar from "./MemberSearchBar";
import ExpenseService from "../services/ExpenseService";
import UserService from "../services/UserService";
import GroupService from "../services/GroupService";


export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // userId: 0,
            groupId: 0,
            amount: '',
            expenseType: 'Other',
            note: '',
            due: '',
            expenser: '',
            username: '',
            members:[],
            member:{}
        }

        this.service = ExpenseService.instance;
        this.userService = UserService.instance;
        this.groupService = GroupService.instance;
        // this.setUserId = this.setUserId.bind(this);
        this.setGroupId = this.setGroupId.bind(this);
        this.setAmount = this.setAmount.bind(this);
        this.setNote = this.setNote.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setType = this.setType.bind(this);
        this.setExpenser = this.setExpenser.bind(this);
        this.setUsername = this.setUsername.bind(this);

    }

    componentDidMount() {
        this.setGroupId(this.props.match.params.groupId);
        this.setMembers(this.props.match.params.groupId);
        // this.setUserId(this.props.userId);
    }

    // setUserId(userId) {
    //     this.setState({userId: userId})
    // }

    setGroupId(groupId) {
        this.setState({groupId: groupId});
    }

    setAmount(event) {
        this.setState({
            amount: event.target.value
        })
    }

    setNote(event) {
        this.setState({
            note: event.target.value
        })
    }

    setDate(event) {
        this.setState({
            due: event.target.value
        })
    }

    setType(event) {
        this.setState({
            expenseType: event.target.value
        })
    }

    setExpenser(expenser) {
        this.setState({
            expenser: expenser
        })
    }

    setUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    setMembers(groupId) {
        this.groupService.findAllMembersForGroup(groupId)
            .then((members) => this.setState({members: members}))
    }

    findUserName(username) {
        for(var i = 0; i<this.state.members.length; i++) {
            if(this.state.members[i].username === username) {
                // this.setState({member: this.state.members[i]})
                return this.state.members[i].id;
            }
        }
        return 0;
    }
    createExpense() {
        var expense =
            {
                ammount: this.state.amount,
                expenseType: this.state.expenseType,
                note: this.state.note,
                expenseDate: this.state.due
            }

            var expenserId = this.findUserName(this.state.username)
        if(expenserId === 0) {
            window.alert("user is not in group")
        } else {
            if (expense.ammount != ''
                && expense.expenseType != ''
                && this.state.member.id != '') {
                this.service
                    .addExpenseToGroup(this.state.groupId, expenserId, expense)
                    .then(alert('added'))
            } else {
                console.log(expense)
                alert('missing information for expense')
            }
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <h2>Create an Expense</h2>
                <div className="form-group">
                    <h3>Amount</h3>
                    <input placeholder="20" className="form-control"
                           onChange={this.setAmount}/>
                </div>

                <div className="form-group">
                    <h3>Expenser</h3>
                    <input placeholder="Username" className="form-control"
                           onChange={this.setUsername}/>
                    {/*<MemberSearchBar/>*/}
                </div>

                <div className="form-group">
                    <h3>Expense Type</h3>
                    <select className="form-control" onChange={this.setType}>
                        <option value="Accommodation">Accommodation</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Other" selected>Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <h3>Note</h3>
                    <input placeholder="Title or Description" className="form-control"
                           onChange={this.setNote}/>
                </div>

                <div className="form-group">
                    <h3>Expense Date</h3>
                    <input type="date" placeholder="mm/dd/yyyy" className="form-control"
                           onChange={this.setDate}/>
                </div>

                <div className="form-group">
                    <button className="btn btn-block btn-info"
                            onClick={() => this.createExpense()}>Create
                    </button>
                </div>
            </div>
        )
    }
}