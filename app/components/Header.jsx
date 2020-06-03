import React from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/theme.js';

const Header = () => {
    const activeStyle = {
        color: '#6983aa'
    }
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
                < div className="header">
                    <ul className="header-options">
                        <NavLink to="/" style={{ color: '#000' }} activeStyle={activeStyle} exact><li>Top</li></NavLink>
                        <NavLink to="/new" style={{ color: '#000' }} activeStyle={activeStyle}><li>New</li></NavLink>
                    </ul>
                    <p onClick={toggleTheme}>{theme === 'light' ? '🦇' : '🌞'}</p>
                </div>
            )
            }
        </ThemeConsumer >
    );
};

export default Header;