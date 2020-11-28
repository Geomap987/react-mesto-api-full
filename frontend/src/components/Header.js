import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';


function Header({ userEmail, buttonLink, buttonText, handleClick }) {
 
   
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Место. Россия" />
            <div className="header__container">
                <p className="header__email">{userEmail}</p>
                <button className="header__button" onClick={handleClick}>
                    <Link className='header__button-text' to={buttonLink} >{buttonText}</Link>
                </button>
            </div>
        </header>
    );
}

export default Header;