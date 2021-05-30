import React, {Component} from "react";
import {withRouter} from 'react-router'
import {Link} from "react-router-dom";
import AuthenticationService from '../authorisation/AuthenticationService'

import '../styles/navbarStyle.css'

class NavigationComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <div className={'navbar'}>
                <div className={'navbar-logo'}>
                    <Link to={'/home'}>Fit & Sport</Link>
                </div>

                <ul className={'navbar-menu'}>
                    <li className="navbar-item">
                        <Link to={'/home'}>Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to={'/dashboard'}>Trainings plans</Link>
                    </li>
                    {isUserLoggedIn && <li className="navbar-item">
                        <Link to={'/create'}>Add new Training plan</Link>
                    </li>}
                    <li className="navbar-item">
                        <Link to={'/run'}>Running results</Link>
                    </li>
                </ul>

                <ul className={'navbar-login'}>
                    {!isUserLoggedIn && <li className="navbar-item">
                        <Link to={'/login'}>Login</Link>
                    </li>}
                    {!isUserLoggedIn && <li className="navbar-item">
                        <Link to={'/register'}>Register</Link>
                    </li>}
                    {isUserLoggedIn && <li className="navbar-item">
                        <Link to={'/home'}
                              onClick={AuthenticationService.logout}>
                            Logout<
                            /Link>
                    </li>}
                </ul>
            </div>
        )
    }

}

export default withRouter(NavigationComponent);
