import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Button,
    Input,
    Form,
    FormGroup,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    ModalFooter
}
    from 'reactstrap'
import { addExpense } from '../actions/expenseActions'
import { BudgetOverView } from './BudgetOverView';

export class ExpenseList extends Component<any, any> {
    state = {
        modalopen: false,
        dropdownOpen: false,
        category: 'Select Category',
        itemName: '',
        amount: Number
    }
    onSubmit: any = () => {
        this.toggle();
        console.log('hi')
        const { category, itemName, amount } = this.state;
        this.props.addExpense({ category, item: itemName, amount: +amount });
    };
    onhandleDropDown: any = (item: any) => {
        this.setState({
            category: item.category
        })
    }
    toggleBtn = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    toggle: any = () => {
        this.setState({
            modalopen: !this.state.modalopen
        });
    }
    onChange: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { items } = this.props;
        return (
            <div>
                <BudgetOverView budget={this.props.budget} expense={this.props.expense} />

                <Form inline onSubmit={(e) => e.preventDefault()}>

                    <Button
                        color="dark"
                        style={{ marginBottom: '2rem' }}
                        onClick={this.toggle.bind(this)}
                    >Add Expense</Button>

                </Form>
                <Modal returnFocusAfterClose={false} isOpen={this.state.modalopen} >
                    <ModalHeader toggle={this.toggle} >Add To Expense List</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup >
                                <Label className='expense-modal' for="category">Category  : </Label>
                                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleBtn.bind(this)}>
                                    <DropdownToggle caret>
                                        {this.state.category}</DropdownToggle>
                                    <DropdownMenu>
                                        {items.map((item: { _id: any, category: any, isActive: boolean }) => (
                                            <DropdownItem key={item._id} onClick={this.onhandleDropDown.bind(this, item)}>{item.category}</DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </FormGroup>
                            <FormGroup>
                                <Label className='expense-modal' for="item">Item : </Label>
                                <Input
                                    className="ml-auto"
                                    type="text"
                                    name="itemName"
                                    id="item"
                                    placeholder="Ad category item"
                                    onChange={this.onChange.bind(this)} />
                            </FormGroup>
                            <FormGroup>
                                <Label className='expense-modal' for="cost">Amount : </Label>
                                <Input
                                    type="text"
                                    name="amount"
                                    id="cost"
                                    placeholder="Add amount spent"
                                    onChange={this.onChange.bind(this)} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onSubmit.bind(this)}>ADD</Button>
                        <Button color="danger" onClick={this.toggle.bind(this)}>Close</Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}

// ExpenseList.propTypes = {
//     getitems: PropTypes.func.isRequired,
//     category: PropTypes.object.isRequired
// }

export default ExpenseList;
