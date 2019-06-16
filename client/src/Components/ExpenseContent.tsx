import React, { Component } from 'react'
import PropTypes from 'prop-types';
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
    ModalFooter,
    Table

}
    from 'reactstrap';

import { updateExpense, getExpenses, softExpense, deleteExpense, addExpense } from '../actions/expenseActions'
import { ExpenseList } from './ExpenseList';

export class ExpenseContent extends Component<any, any> {
    static propTypes: { getExpenses: PropTypes.Validator<(...args: any[]) => any>; expense: PropTypes.Validator<object>; };
    onhandleDropDown: any = (category: any) => {
        this.setState({
            category
        })
    }
    toggleBtn = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    onSubmit: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { category, itemName, amount, id } = this.state;
        this.props.updateExpense({ id, category, item: itemName, amount: +amount });

        //this.rerenderCom();
    };
    onChange: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    toggleDel: any = () => {

        this.toggleModal();
        this.props.softExpense({ id: this.state.id, isActive: !this.state.isActive })
    };
    rerenderCom() {
        this.forceUpdate();
        this.setState({ modalopen: !this.state.modalopen });
        this.props.getExpenses();
    }
    componentDidMount() {
        //this.props.getExpenses();
        console.log(this.props.items)
        //this.filterExpenses();
    }
    componentDidUpdate() {
        if (!this.state.loaded) {
            console.log('once')
            const expenses = this.props.expense.expenses.map((list: { _id: any, category: any }) => {

                this.props.items.map((item: { category: any, isActive: boolean }) => {
                    //console.log(!item.isActive && item.category===list.category)
                    //console.log(item.category+''+list.category)
                    if (!item.isActive && item.category === list.category && list._id)
                        this.props.deleteExpense(list._id);
                })
            });
            this.setState({loaded: true})
        }

    }
    state = {
        modalopen: false,
        dropdownOpen: false,
        id: '',
        category: '',
        itemName: '',
        amount: '',
        isActive: true,
        loaded: false
    }
    toggle: any = (item: any) => {
        this.setState({
            modalopen: !this.state.modalopen,
            category: item.category,
            itemName: item.item,
            amount: '' + item.amount,
            id: item._id,
            isActive: item.isActive
        });
    }
    toggleModal: any = () => {
        this.setState({
            modalopen: !this.state.modalopen
        })
    }

    render() {

        const { expenses } = this.props.expense;
        const expenseCategory = this.props.items.filter((item: any) => item.isActive === true)
        const { itemName, amount, isActive } = this.state;

        return (
            <div>
                <div>
                    <ExpenseList addExpense={this.props.addExpense} items={this.props.items.filter((item: any) => item.isActive === true)} expense={this.props.expense} budget={this.props.budget} />

                </div>
                <Form>
                    <FormGroup>
                        <div>
                            <Table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Category</th>
                                        <th>Item Name</th>
                                        <th>Amount</th>
                                        <th>Expense date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses.map((list: { _id: any, category: any, item: any, amount: number, date: any, isActive: boolean }) => (

                                        <tr key={list._id} >
                                            <th scope="row">
                                                <Button key={list._id + list.amount} onClick={this.toggle.bind(this, list)}>
                                                    edit
                                                </Button>
                                            </th>
                                            <td className={list.isActive ? '' : 'isActiveFalse'} >{list.category}</td>
                                            <td className={list.isActive ? '' : 'isActiveFalse'}>{list.item}</td>
                                            <td className={list.isActive ? '' : 'isActiveFalse'}>{list.amount}</td>
                                            <td className={list.isActive ? '' : 'isActiveFalse'}>{list.date}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>
                        </div>
                    </FormGroup>
                </Form>
                <Modal returnFocusAfterClose={false} isOpen={this.state.modalopen} >
                    <ModalHeader toggle={this.toggleModal} >Update To Expense List</ModalHeader>
                    <ModalBody>
                        {isActive ? (
                            <Form>
                                <FormGroup >
                                    <Label className='expense-modal' for="category">Category : </Label>
                                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleBtn.bind(this)}>
                                        <DropdownToggle caret>
                                            {this.state.category}</DropdownToggle>
                                        <DropdownMenu>
                                            {expenseCategory.map((item: { _id: any, category: any, isActive: boolean }) => (
                                                <DropdownItem key={item._id} onClick={this.onhandleDropDown.bind(this, item.category)}>{item.category}</DropdownItem>
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
                                        value={itemName}
                                        placeholder="Ad category item"
                                        onChange={this.onChange.bind(this)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label className='expense-modal' for="cost">Amount : </Label>
                                    <Input
                                        type="text"
                                        name="amount"
                                        id="cost"
                                        value={amount}
                                        placeholder="Add amount spent"
                                        onChange={this.onChange.bind(this)} />
                                </FormGroup>
                            </Form>
                        )
                            :
                            (
                                <Form>
                                    <FormGroup >
                                        <Label className='expense-modal' for="category">Category : </Label>
                                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleBtn.bind(this)}>
                                            <DropdownToggle caret>
                                                {this.state.category}</DropdownToggle>
                                            <DropdownMenu>
                                                {expenseCategory.map((item: { _id: any, category: any, isActive: boolean }) => (
                                                    <DropdownItem key={item._id} onClick={this.onhandleDropDown.bind(this, item.category)}>{item.category}</DropdownItem>
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
                                            disabled
                                            value={itemName}
                                            placeholder="Ad category item"
                                            onChange={this.onChange.bind(this)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className='expense-modal' for="cost">Amount : </Label>
                                        <Input
                                            type="text"
                                            name="amount"
                                            id="cost"
                                            disabled
                                            value={amount}
                                            placeholder="Add amount spent"
                                            onChange={this.onChange.bind(this)} />
                                    </FormGroup>


                                </Form>
                            )
                        }
                    </ModalBody>

                    {isActive ? (
                        <ModalFooter>
                            <Button color="primary" onClick={this.onSubmit.bind(this)}>Update</Button>
                            <Button color="danger" onClick={this.toggleDel.bind(this)}>Delete</Button>
                        </ModalFooter>
                    ) :
                        (
                            <ModalFooter>
                                <Button color="danger" onClick={this.toggleDel.bind(this)}>UndoDelete</Button>
                            </ModalFooter>
                        )
                    }

                </Modal>
            </div>
        )
    }
}



const mapStateToProps = (state: any) => ({
})

export default ExpenseContent;
