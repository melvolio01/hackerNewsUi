import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <ul className="header-options">
                    <NavLink to="/" exact><li>Top</li></NavLink>
                    <NavLink to="/new"><li>New</li></NavLink>
                </ul>
            </div>
        );
    }
}

export default Header;