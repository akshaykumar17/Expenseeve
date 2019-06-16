import React, { Component } from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types';
import ExpenseList from './ExpenseList'
import ExpenseContent from './ExpenseContent'
import { getitems } from '../actions/categoryActions';
import { connect } from 'react-redux';

export class Home extends Component<any, any> {
    componentDidMount() {
        this.props.getitems();
    }
    static propTypes: { getitems: PropTypes.Validator<(...args: any[]) => any>; category: PropTypes.Validator<object>; };
    render() {
        return (
            <div>
                <Container style={{marginTop:'4rem'}}>
                    <ExpenseList items={this.props.category.items.filter((item: any) => item.isActive === true)} />
                    <ExpenseContent items={this.props.category.items.filter((item: any) => item.isActive === true)} />
                </Container>

            </div>
        )
    }
}

Home.propTypes = {
    getitems: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    category: state.category
})

export default connect(
    mapStateToProps,
    { getitems }
)(Home); 
