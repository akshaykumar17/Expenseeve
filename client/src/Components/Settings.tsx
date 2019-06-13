import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem, ListGroupItemText, Button, Input, Form, FormGroup } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import uuid from 'uuid';
import { getitems, deleteItem, addItem } from '../actions/categoryActions';


export class Settings extends Component<any, any> {
    onDeleteClick = (item: any) => {
        item.isActive = !item.isActive;
        this.props.deleteItem(item._id, item.category, item.isActive);
        this.setState({ softdele: !item.isActive });
    };
    static propTypes: { getitems: PropTypes.Validator<(...args: any[]) => any>; category: PropTypes.Validator<object>; };
    onSumbitAdd = () => {

        const NewItem = { category: this.state.categoryname }
        this.props.addItem(NewItem);

    };
    constructor(props: any) {
        super(props);
        this.state = {
            categoryname: '',
            softdele: false
        }
    }
    componentDidMount() {
        this.props.getitems();
    }

    render() {
        const { items } = this.props.category;
        const { categoryname } = this.state;
        return (
            <div>
                <Container>
                    <Form>
                        <FormGroup>
                            <div style={{ display: "flex" }}>
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
                                                    <ListGroupItemText disabled={item.isActive ? false : true}>
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

            </div>
        )
    }
}
Settings.propTypes = {
    getitems: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    category: state.category
})

export default connect(
    mapStateToProps,
    { getitems, deleteItem, addItem },

)(Settings)
