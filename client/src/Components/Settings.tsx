import React, { Component } from 'react'
import { TotalBudget, Categories } from '../Contants'
import { ExpenseList } from './ExpenseList'
import { Container, ListGroup, ListGroupItem, Button, Input } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import uuid from 'uuid'

export class Settings extends Component {

    state = {
        items: [
            { id: uuid(), category: 'Grocery', isActive: true },
            { id: uuid(), category: 'Rent', isActive: true },
            { id: uuid(), category: 'Travel', isActive: true }
        ],
        categoryname: ''
    }
    render() {
        const { items } = this.state;
        const { categoryname } = this.state;

        return (
            <div>
                <Container>
                    <div style={{display:"flex"}}>
                        <Input style={{marginRight:"1.5rem"}} type="text" value={this.state.categoryname} onChange={(e) => { this.setState({ categoryname: e.target.value }) }} />
                        <Button
                            color="dark"
                            style={{ marginBottom: '2rem' }}
                            onClick={() => {
                                if (categoryname) {
                                    this.setState(() => ({
                                        items: [...items, { id: uuid(), category: categoryname, isActive: true }]
                                    }));
                                }
                            }}
                        >
                            Add
                    </Button>
                    </div>
                    <div>
                        <ListGroup>
                            <TransitionGroup className="category-list">
                                {items.map(({ id, category, isActive }) => (

                                    < CSSTransition key={id} timeout={500} classNames="fade" >
                                        <ListGroupItem>

                                            <Button
                                                className="remove-btn"
                                                color="danger"
                                                size="sm"
                                                onClick={() => {
                                                    this.setState(() => {
                                                        items: items.filter(item => {
                                                            if (item.id == id) {
                                                                item.isActive = !item.isActive;
                                                                isActive = item.isActive; console.log(isActive)
                                                            }
                                                        })
                                                    });
                                                }}

                                            >
                                                &times;</Button>
                                            {category}
                                        </ListGroupItem>
                                    </CSSTransition>

                                ))}
                            </TransitionGroup>
                        </ListGroup>
                    </div>
                </Container>

            </div>
        )
    }
}

export default Settings
