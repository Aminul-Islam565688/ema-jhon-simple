import React, { useContext } from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import { UseContext } from '../../App';
import logo from '../../images/logo.png';
import Css from './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UseContext)
    return (
        <div className='header'>
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/Manage">Manage Inventory</Link>
                <button onClick={() => setLoggedInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;