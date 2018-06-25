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
        this.state = {
            groupId: '',
            isHidden: true,
            anonymous: null
        }
        this.payService = PaymentService.instance
        this.toggleAnonymous.bind(this);
        //this.toggleAnonymous();
    }

    componentDidMount() {
        this.setState({groupId: this.props.match.params.groupId})
        if(this.props.match.params.userId == 0) {
            this.setState({anonymous: true})
        } else {
            this.setState({anonymous: false})
        }
    }

    toggleAnonymous() {
        if(this.props.match.params.userId == 0) {
            this.setState({anonymous: true})
        }
    }

    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    renderMembers() {
        if(this.state.groupId != '' && this.state.anonymous != null) {
            return(<MembersList groupId={this.state.groupId}
                                 anonymous={this.state.anonymous}/>)
        }
    }

    renderExpenses() {
        if(this.state.groupId != '' && this.state.anonymous != null) {
            return(<ExpensesList groupId={this.state.groupId}
                                anonymous={this.state.anonymous}/>)
        }
    }

    renderDues() {
        if(this.state.groupId != '') {
            return(<PaymentDueList groupId={this.state.groupId}/>)
        }
    }

    // getDue() {
    //     this.renderDues()
    // }

    render() {
        return (
            <div>
                <h1>Group Page</h1>
                {/*<MemberSearchBar/>*/}
                <div className="row">
                    <div className="col-4">
                        {this.renderMembers()}
                    </div>
                    <div className="col-4">
                        {this.renderExpenses()}
                    </div>
                    <div className="col-4">
                        <button type="button" className="btn btn-warning"
                                onClick={this.toggleHidden.bind(this)}>GET PAYMENT DUE</button>
                        {!this.state.isHidden && <PaymentDueList groupId={this.state.groupId}/>}
                        {/*{this.renderDues()}*/}
                    </div>
                </div>
            </div>
        )
    }

}