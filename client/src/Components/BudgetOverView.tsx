import React, { Component } from 'react'
import {
    CircularProgressbar
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReactMinimalPieChart from 'react-minimal-pie-chart'



export class BudgetOverView extends Component<any, any> {

    shouldComponentUpdate(nextProps: any, nextState: any) {
        const totalamount = this.props.budget.budget.length === 1 ? this.props.budget.budget[0].totalamount : -1;
        let sum_up = 0;
        nextProps.expense.expenses.map((item: { amount: any, isActive: boolean }) => {
            if (item.isActive)
                sum_up += item.amount
        })
        // console.log(this.props.expense.expenses.length !== nextProps.expense.expenses.length)
        // console.log(this.state.amountSpent !== nextState.amountSpent)
        // console.log(sum_up!==this.state.amountSpent)

        return this.props.expense.expenses.length !== nextProps.expense.expenses.length ||
            (this.state.amountSpent !== nextState.amountSpent || sum_up !== this.state.amountSpent) || ((totalamount !== -1 && totalamount !== nextState.budgetamount) || nextState.budgetamount !== this.state.budgetamount)

    }
    componentDidUpdate() {
        //console.log(this.props.expense.expenses.length+''+this.state.amountSpent)
        const totalamount = this.props.budget.budget.length === 1 ? this.props.budget.budget[0].totalamount : -1;

        let sum_up = 0;
        if (this.props.expense.expenses.length > 0 || totalamount !== -1) {
            this.props.expense.expenses.map((item: { amount: any, isActive: boolean }) => {
                if (item.isActive)
                    sum_up += item.amount
            })
            //   console.log(totalamount !== -1 && totalamount !== this.state.budgetamount)
            //    console.log((sum_up !== this.state.amountSpent && sum_up !== 0 )|| sum_up === 0)
            if (totalamount !== -1 && totalamount !== this.state.budgetamount) {

                this.setState({
                    budgetamount: totalamount,
                    loaded: true
                })
            }
            else if ((sum_up !== this.state.amountSpent && sum_up !== 0) || sum_up === 0)
                this.setState({
                    amountSpent: sum_up,
                    loaded: true
                })

        }

    }
    state = {
        amountSpent: 0,
        budgetamount: 0,
        loaded: false
    }
    render() {
        const { amountSpent, budgetamount } = this.state;
        let percentage = budgetamount !== 0 ? '' + (amountSpent / budgetamount) * 100 : '' + 0
        let text = +percentage > 100 ? (100 - (+percentage)) + ' overdue' : percentage
        //text= +text>=0?Number.parseFloat(text).toFixed(0):Number.parseFloat(text).toFixed(0)+'\n overdue'
        const dueOrnot = +text >= 0 ? 'nooverdue' : 'overdue'
        let leftBudget = 0;
        let data = this.props.expense.expenses.map((item: { category: any, amount: any }) => {
            leftBudget += item.amount;
            return {
                title: item.category,
                value: budgetamount ? item.amount * 100 / budgetamount : 0,
                color: '#' + Math.random().toString(16).substr(-6)
            }
        })
        data.push({
            title: 'remaining',
            value: budgetamount ? (budgetamount - leftBudget) * 100 / budgetamount : 1,
            color: '#' + Math.random().toString(16).substr(-6)
        })
        return (
            <div style={{ display: 'flex' }}>

                <div style={{ width: '50%' }}>
                    <Example budget={budgetamount} amountSpent={amountSpent} label="Default">
                        <CircularProgressbar className={dueOrnot} value={+percentage} text={`${Number.parseFloat(text).toFixed(0)}%`} />
                    </Example>
                </div>
                <div className='budgetBox' style={{ marginBottom: 80, width: '50%', border: '2px solid rgb(221, 221, 221)' }}>
                    <h3 className="h5" style={{ paddingLeft: '1.5rem' }}>Spilt Wise</h3>
                    <hr style={{ border: "2px solid #ddd", marginTop: '.5rem' }} />
                    <div style={{ display: 'flex' }}>
                        <ReactMinimalPieChart

                            data={data}
                            style={{ height: '150px', width: '50%' }}
                            lineWidth={15}
                            paddingAngle={5}
                            lengthAngle={-360}
                            cx={50}
                        />
                        {/* <div style={{ width: '50%' }} >
                            <ul>
                                {data.map((item: { title: any, value: any, color: any }) => (
                                    <li key={item.color} className='m-auto'>
                                        <div style={{ backgroundColor: item.color, width: '10px', height: '10px' }} ></div>
                                        <p >{item.title}</p>
                                        <p> {Number.parseFloat(item.value).toFixed(0)}%</p>
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}
function Example(props: any) {
    const { amountSpent, budget } = props;
    return (
        <div style={{ marginBottom: 80, width: '90%', border: '2px solid rgb(221, 221, 221)' }}>
            <h3 className="h5" style={{ paddingLeft: '1.5rem' }}>{props.label}</h3>
            <hr style={{ border: "2px solid #ddd", marginTop: '.5rem' }} />
            <div style={{ marginTop: 30, display: "flex", paddingLeft: '1.5rem' }}>
                <div style={{ width: 100 }}>{props.children}</div>
                <div style={{ marginLeft: 30 }}>
                    <p>Total budget</p>
                    <p>{budget}</p>
                    <p>Total Expenses</p>
                    <p>{amountSpent}</p>
                </div>
            </div>
        </div>
    );
}

export default BudgetOverView

