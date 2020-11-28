import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({authorization }) => {
    const [data, setData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, username } = data;

        if (!password || !username) {
            return;
        }
        authorization(password, username);
        setData({ password: '', username: '' });
    }

    return (
        <div onSubmit={handleSubmit} className="login">

            <p className="login__welcome">
                Вход
            </p>
            <form className="login__form">
                <input className="login__input" id="username" required name="username" type="text" value={data.username} onChange={handleChange} placeholder="Email" />
                <input className="login__input" id="password" required name="password" type="password" value={data.password} onChange={handleChange} placeholder="Пароль" />
                <div className="login__button-container">
                    <button type="submit" className="login__link">Войти</button>
                </div>
            </form>
            <div className="login__signup">
                <p>Ещё не зарегистрированы?</p>
                <Link to="/sign-up" className="signup__link">Зарегистрироваться</Link>
            </div>
            
        </div>
    )
}

export default Login;
