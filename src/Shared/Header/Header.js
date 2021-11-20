import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <header className="container header pt1 pb1">
                <Link to="/">
                    <img style={{width:'2.5em'}} src="/job-search.png" alt=""/>
                </Link>
                <input onChange={(ev) =>{this.props.searchCandidate(ev)}} type="text" placeholder="Type to search" className="input__text"/>
                <nav >
                    <ul>
                        <li>
                            <NavLink activeClassName="active" to="/">
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/shortlisted" activeClassName="active">
                                <span>Shortlisted</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/rejected" activeClassName="active">
                                <span>Rejected</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}
