import React, { Component } from 'react'
import { Route, NavLink, HashRouter } from 'react-router-dom'
import Home from '../Components/Home'
import Settings from '../Components/Settings'


const details = {
    width : '80%',
    marginLeft : 'auto'
};
export class ToolBar extends Component {
    
    render() {
        return (
            <header>
                <HashRouter>
                    <div style={{position:'absolute', width:'20%'}}>
                        <ul className="header">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/setting">Settings</NavLink></li>
                            <li><NavLink to="/profile"/>Profile</li>
                        </ul>
                    </div>
                    <div style={details} className="content">
                        <Route exact path="/" component={Home} />
                        <Route path="/setting" component={Settings} />
                    </div>
                </HashRouter>
            </header>
        )
    }
}

export default ToolBar
