import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem, ListGroupItemText, Button, Input, Form, FormGroup, Label } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { getitems, deleteItem, addItem } from '../actions/categoryActions';
import { addBudget, getBudget, updateBudget } from '../actions/budgetActions'


export class Settings extends Component<any, any> {
    onDeleteClick = (item: any) => {
        item.isActive = !item.isActive;
        this.props.deleteItem(item._id, item.category, item.isActive);
        this.setState({ softdele: !item.isActive });
    };
    onSumbitAdd = () => {

        const NewItem = { category: this.state.categoryname }
        this.props.addItem(NewItem);

    };
    onSumbitBudget: any = () => {
        const totalamount = this.props.budget.budget.length === 1 ? this.props.budget.budget[0].totalamount : 0;
        const id = this.props.budget.budget.length === 1 ? this.props.budget.budget[0]._id : 0;
        console.log(this.state.budgetamount)
        if (totalamount !== this.state.budgetamount && totalamount === 0)
            this.props.addBudget({ totalamount: +this.state.budgetamount });
        else
            this.props.updateBudget({ id: id, totalamount: this.state.budgetamount });
    };
    static propTypes: { getBudget: PropTypes.Validator<(...args: any[]) => any>; getitems: PropTypes.Validator<(...args: any[]) => any>; category: PropTypes.Validator<object>; budget: PropTypes.Validator<object>; };
    constructor(props: any) {
        super(props);
        this.state = {
            budgetamount: '',
            categoryname: '',
            softdele: false,
            loaded: false
        }
    }
    componentDidMount() {
            this.props.getitems();
            this.props.getBudget(); 
    }
    componentDidUpdate() {
        const totalamount = this.props.budget.budget.length === 1 ? this.props.budget.budget[0].totalamount : 0;

        if (totalamount !== 0 && totalamount !== this.state.budgetamount && !this.state.loaded)
            this.setState({
                budgetamount: totalamount,
                loaded: true
            })

    }

    render() {
        const { items } = this.props.category;
        const { categoryname, budgetamount } = this.state;
        const totalamount = this.props.budget.budget.length === 1 ? this.props.budget.budget[0].totalamount : 0;

        return (
            
                <Container style={{ marginTop: '2.5rem' }}>
                    <Form>
                        <FormGroup>
                            {totalamount === 0 ? (
                                <div style={{ display: "flex" }}>
                                    <Label style={{ marginRight: '1.5rem', marginTop: '.5rem' }}>Budget</Label>
                                    <Input style={{ marginRight: "1.5rem" }} type="text" value={budgetamount} onChange={(e) => { this.setState({ budgetamount: e.target.value }) }} />

                                    <Button
                                        color="dark"
                                        style={{ marginBottom: '2rem' }}
                                        onClick={this.onSumbitBudget.bind(this)}
                                    >
                                        Add </Button>
                                </div>
                            ) :
                                (
                                    <div style={{ display: "flex" }}>
                                        <Label style={{ marginRight: '1.5rem', marginTop: '.5rem' }}>Budget</Label>
                                        <Input style={{ marginRight: "1.5rem" }} type="text" value={budgetamount} onChange={(e) => { this.setState({ budgetamount: e.target.value }) }} />

                                        <Button
                                            color="dark"
                                            style={{ marginBottom: '2rem' }}
                                            onClick={this.onSumbitBudget.bind(this)}
                                        >
                                            Update </Button>

                                    </div>
                                )
                            }
                        </FormGroup>
                        <FormGroup>
                            <div style={{ display: "flex" }}>
                                <Label style={{ marginRight: '1.5rem', marginTop: '.5rem' }}>Category</Label>
                                <Input style={{ marginRight: "1.5rem" }} type="text" value={categoryname} onChange={(e) => { this.setState({ categoryname: e.target.value }) }} />
                                <Button
                                    color="dark"
                                    style={{ marginBottom: '2rem' }}
                                    onClick={this.onSumbitAdd.bind(this)}
                                >
                                    Add </Button>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div>
                                <ListGroup>
                                    <TransitionGroup className="category-list">
                                        {items.map((item: { _id: any, category: any, isActive: boolean }) => (

                                            < CSSTransition key={item._id} timeout={500} classNames="fade" >
                                                <ListGroupItem style={{ color: item.isActive ? '' : '#b3b5b7 !important' }}>

                                                    <Button
                                                        className='remove-btn'
                                                        color={item.isActive ? 'danger' : 'secondary'}
                                                        size="sm"
                                                        onClick={this.onDeleteClick.bind(this, item)}
                                                    >
                                                        &times;</Button>
                                                    <ListGroupItemText style={{ textDecorationLine: item.isActive ? '' : 'line-through' }} disabled={item.isActive ? false : true}>
                                                        {item.category}
                                                    </ListGroupItemText>

                                                </ListGroupItem>
                                            </CSSTransition>

                                        ))}
                                    </TransitionGroup>
                                </ListGroup>
                            </div>
                        </FormGroup>
                    </Form>
                </Container>

           
        )
    }
}
Settings.propTypes = {
    getBudget: PropTypes.func.isRequired,
    getitems: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    budget: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    category: state.category,
    budget: state.budget
})

export default connect(
    mapStateToProps,
    { getitems, deleteItem, addItem, getBudget, addBudget, updateBudget },

)(Settings)
