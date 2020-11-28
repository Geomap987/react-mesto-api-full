import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ registration }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    registration(password, email)

  }

  return (
    <div className="register">

      <p className="register__welcome">
        Регистрация
        </p>
      <form onSubmit={handleSubmit} className="register__form">
        <input className="register__input" id="email" name="email" type="email" value={data.email} onChange={handleChange} placeholder="Email" />
        <input className="register__input" id="password" name="password" type="password" value={data.password} onChange={handleChange} placeholder="Пароль" />
        <div className="register__button-container">
          <button type="submit" className="register__link">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">Войти</Link>
      </div>
    </div>
  )
}

export default Register;
