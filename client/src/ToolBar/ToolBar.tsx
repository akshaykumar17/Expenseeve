import React, { Component } from 'react'
import { Route, NavLink, HashRouter } from 'react-router-dom'
import Home from '../Components/Home'
import Settings from '../Components/Settings'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,

    Container
} from 'reactstrap';


const details = {
    width: '80%',
    marginLeft: 'auto'
};
export class ToolBar extends Component {

    render() {
        return (
            <div style={{ display: "flex" }}>
                <HashRouter>
                    <div>
                        <Navbar style={{ display: "inherit" }} color="bright" expand="sm" className="mr-5">
                            <Nav navbar >
                                <NavItem>
                                    <NavLink to="/">Home</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink to="/setting">Settings</NavLink>
                                </NavItem>
                            </Nav >
                            <Nav navbar>
                                <NavItem>
                                    <NavLink to="/profile" >Profile</NavLink>
                                </NavItem>
                            </Nav>
                        </Navbar>
                    </div>

                    <div className="ml-auto content">
                        <Route exact path="/" component={Home} />
                        <Route path="/setting" component={Settings} />
                    </div>
                </HashRouter>

            </div >


        )
    }
}

export default ToolBar
