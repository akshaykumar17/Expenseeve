import React, { Component } from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types';
import ExpenseContent from './ExpenseContent'
import { getitems } from '../actions/categoryActions';
import { getBudget } from '../actions/budgetActions';
import { getExpenses, updateExpense, softExpense, deleteExpense, addExpense } from '../actions/expenseActions'
import { connect } from 'react-redux';

export class Home extends Component<any, any> {
    static propTypes: { getitems: PropTypes.Validator<(...args: any[]) => any>; getBudget: PropTypes.Validator<(...args: any[]) => any>; getExpenses: PropTypes.Validator<(...args: any[]) => any>; category: PropTypes.Validator<object>; budget: PropTypes.Validator<object>; expense: PropTypes.Validator<object>; };
    componentDidMount() {
        this.props.getitems();
        this.props.getExpenses();
        this.props.getBudget();
    }
    render() {

        return (
            <Container style={{ minWidth: '55rem' }}>
                <ExpenseContent 
                items={this.props.category.items} 
                expense={this.props.expense} 
                budget={this.props.budget} 
                getExpenses={this.props.getExpenses}
                updateExpense={this.props.updateExpense}
                softExpense={this.props.softExpense}
                deleteExpense={this.props.deleteExpense}
                addExpense={this.props.addExpense}
                />
            </Container>

        )
    }
}

Home.propTypes = {
    getitems: PropTypes.func.isRequired,
    getBudget: PropTypes.func.isRequired,
    getExpenses: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    budget: PropTypes.object.isRequired,
    expense: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    category: state.category,
    budget: state.budget,
    expense: state.expense
})

export default connect(
    mapStateToProps,
    { getitems, getBudget, getExpenses, updateExpense, softExpense, deleteExpense, addExpense }

)(Home); 
