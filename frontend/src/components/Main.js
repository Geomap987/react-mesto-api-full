import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    // const cards = React.useContext(CardContext);
    

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__wrapper">
                    <div className="profile__photo-wrapper">
                        <img className="profile__photo" src={currentUser.avatar} alt="Фотография профиля" />
                        <div onClick={props.onEditAvatar} className="profile__edit-pen"></div>
                    </div>
                    <div className="profile__text-container">
                        <div className="profile__button-wrapper">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button onClick={props.onEditProfile} type="button" className="profile__edit-button" ></button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button onClick={props.openAddPlace} type="button" className="profile__add-button"></button>
            </section>
            <section className="photo-grid">
                <div className="photo-grid__container">
                    {props.cards.map(card => 
                    <Card 
                    onCardDelete={props.onCardDelete} 
                    onCardLike={props.onCardLike} 
                    onCardClick={props.onCardClick}
                    isLiked={card.likes.some(i => i._id === currentUser._id)} 
                    isOwn={card.owner._id === currentUser._id} 
                    key={card._id} 
                    title={card.name} 
                    link={card.link} 
                    likesNumber={card.likes.length} 
                    item={card} />)}
                </div>
            </section>
        </main>
    );
}

export default Main;