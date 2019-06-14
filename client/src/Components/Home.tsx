import React, { Component } from 'react'
import { Container } from 'reactstrap'
import ExpenseList from './ExpenseList'

export class Home extends Component {
    render() {
        return (
            <div>
                <Container>
                    <ExpenseList />
                </Container>

            </div>
        )
    }
}

export default Home
