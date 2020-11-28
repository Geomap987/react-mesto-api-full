import React from 'react';

function Card({ title, link, likesNumber, onCardClick, item, isOwn, isLiked, onCardLike, onCardDelete}) {
    function handleClick() {
        onCardClick(item);
    }
    function handleLikeClick() {
        onCardLike(item);
    }
    function handleDeleteClick() {
        onCardDelete(item);
    }

    return (
        <article className="photo-grid__card">
            <img className="photo-grid__photo" src={link} alt={title} onClick={handleClick} />
            <button onClick={handleDeleteClick} className={isOwn ? "photo-grid__delete-icon" : "photo-grid__delete-icon_none"}></button>
            <div className="photo-grid__text">
                <h3 className="photo-grid__title">{title}</h3>
                <div className="photo-grid__like-wrapper">
                    <button onClick={handleLikeClick} type="button" className={isLiked ? "photo-grid__like-icon_active" : "photo-grid__like-icon"} />
                    <h4 className="photo-grid__like-counter">{likesNumber}</h4>
                </div>
            </div>
        </article>
    );
}

export default Card;

