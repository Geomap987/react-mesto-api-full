import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import { getToken, setToken } from '../utils/token';

import Header from './Header.js';
import Mesto from './Mesto.js';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register.js';
import Login from './Login.js';
import InfoToolTip from './InfoToolTip.js';

import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardContext } from '../contexts/CurrentCardContext';
import { CardContext } from '../contexts/CardContext';
import { UserDataContext } from '../contexts/UserDataContext';

import cross from '../images/Redcross.svg';
import check from '../images/Blackcheck.svg';
import blank from '../images/Blank.svg';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({ title: '', link: '' });

  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [image, setImage] = useState({});
  const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);


  const history = useHistory();

  
  // useEffect(() => {
  //   api.getUserInfo().then(
  //     (res) => {
  //       console.log(res)
  //       const info = res;
  //       setCurrentUser(info)
  //     }).catch((err) => console.log(err));
  // }, [])





  //регистрация и авторизация
  const authorization = (password, username) => {
    auth.authorize(password, username)
      .then((data) => {
        console.log(data)
        if (!data) {
          setMessage('Что-то пошло не так! Попробуйте еще раз.')
          setImage(cross)
          handleInfoToolTip()
        }
        else {
          setToken(data.token);
          setMessage('');
          setImage(blank)
          tokenCheck()
          history.push('/');
        }
      })
      .then(() => {
        api.getCardList().then(
          (res) => {
            console.log(res)
            const items = res
            setCards(items)
          }).catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        handleInfoToolTip()
      });
      
  }

  const registration = (password, email) => {
    auth.register(password, email).then((res) => {
      console.log(res)
      if (res.status !== 400) {
        setMessage('Вы успешно зарегистрировались!');
        setImage(check)
        setRegistrationSuccess(true)
        handleInfoToolTip();
      } else {
        setMessage('Что-то пошло не так!');
        setImage(cross)
        setRegistrationSuccess(false)
        handleInfoToolTip();
      }
    }).catch((err) => {
      console.log(err)
      setMessage('Что-то пошло не так!');
      setImage(cross)
      setRegistrationSuccess(false)
      handleInfoToolTip();
    }
    )
  }

  const tokenCheck = () => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    auth.getContent(jwt).then((res) => {
      if (res) {
        const currentUser = res;
        console.log(currentUser)
        setLoggedIn(true);
        setCurrentUser(currentUser);
        history.push('/')
      }
      else {
        return
      }
    }).catch(err => console.log(err))
  }

  function handleInfoToolTip() {
    setInfoToolTipOpen(!isInfoToolTipOpen)
  }

  function closeInfoToolTip() {
    setInfoToolTipOpen(false)
    setMessage('')
    setImage(blank)
  }

  function closeInfoToolTipPush() {
    setInfoToolTipOpen(false);
    setMessage('')
    setImage(blank)
    if (registrationSuccess) { history.push('/sign-in') }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

    useEffect(() => {
    api.getCardList().then(
      (res) => {
        console.log(res)
        const items = res
        setCards(items)
        console.log(items)
      }).catch((err) => console.log(err));
  }, [])

  //обработка событий карточек и попапов
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleCardLike(card) {
    console.log(currentUser._id)
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.likeCard(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      console.log(newCard)
      setCards(newCards);
    }).catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    console.log(card.owner._id === currentUser._id)
    api.deleteCard(card._id).then((newCard) => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    }).catch((err) => console.log(err));
  }

 

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setSelectedCard({ title: '', link: '' })
  }

  function handleUpdateUser(a) {
    api.editUserInfo(a).then(
      (res) => {
        const info = res;
        setCurrentUser(info)
        closeAllPopups()
      }).catch((err) => console.log(err));

  }

  function handleUpdateAvatar(a) {
    api.editUserAvatar(a).then(
      (res) => {
        const info = res;
        setCurrentUser(info)
        closeAllPopups()
      }).catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(a) {
   
    api.createCard(a).then(
      (newCard) => {
        console.log(newCard.owner._id)
        console.log(currentUser._id)
        console.log(newCard)
        setCards([...cards, newCard])
        closeAllPopups()
      }).catch((err) => console.log(err));
  }




  return (
      <CurrentUserContext.Provider value={currentUser}>
        <CardContext.Provider value={cards}>
          <CurrentCardContext.Provider value={selectedCard}>
            <Switch>
              <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Mesto}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                openAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                cards={cards}
                closeAllPopups={closeAllPopups}
                isEditProfilePopupOpen={isEditProfilePopupOpen}
                isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                isAddPlacePopupOpen={isAddPlacePopupOpen}
                handleUpdateUser={handleUpdateUser}
                handleUpdateAvatar={handleUpdateAvatar}
                handleAddPlaceSubmit={handleAddPlaceSubmit}
              />
              <Route path="/sign-up">
                <div className="page">
                  <Header 
                  userEmail={``} 
                  buttonLink={`/sign-in`} 
                  buttonText={`Войти`} />
                  <Register 
                  registration={registration} />
                  <InfoToolTip 
                  title={message} 
                  image={image} 
                  isOpen={isInfoToolTipOpen} 
                  onClose={closeInfoToolTipPush} />
                </div>
              </Route>
              <Route path="/sign-in">
                <div className="page">
                  <Header 
                  userEmail={``}
                  buttonLink={`/sign-up`} 
                  buttonText={`Регистрация`} />
                  <Login authorization={authorization} />
                  <InfoToolTip 
                  title={message} 
                  image={image} 
                  isOpen={isInfoToolTipOpen} 
                  onClose={closeInfoToolTip} />
                </div>
              </Route>
              <Redirect to={"/"} />
            </Switch>
          </CurrentCardContext.Provider>
        </CardContext.Provider>
      </CurrentUserContext.Provider>
  );
}

export default App;
