import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <ul className="header-options">
                    <Link to="/"><li>Top</li></Link>
                    <Link to="/new"><li>New</li></Link>
                </ul>
            </div>
        );
    }
}

export default Header;