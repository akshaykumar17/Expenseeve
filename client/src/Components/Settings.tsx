import React, { Component } from 'react'
import { TotalBudget, Categories } from '../Contants'
import { ExpenseList } from './ExpenseList'

export class Settings extends Component {
    render() {
        return (
            <div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                            <td><label htmlFor="">{TotalBudget}</label></td>
                            <td>
                                <input type="text" /></td>
                            <td><button>Udate</button></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="">{Categories}</label></td>
                            <td>
                                <input type="text" /></td>
                            <td><button>Add</button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <ExpenseList />
                </div>
            </div>
        )
    }
}

export default Settings
