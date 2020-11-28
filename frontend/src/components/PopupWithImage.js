import React from 'react';

function PopupWithImage({ onClose, isOpen, image, title }) {
    return (
        <section id="bigphotopopup" className={isOpen ? `popup popup-bigphotopopup popup_opened` : `popup popup-bigphotopopup`}>
            <div className="popup__bigphoto-container ">
                <button onClick={onClose} type="button" id="bigphotobutton" className="popup__close-button"></button>
                <img src={image} className="popup__bigphoto-image" alt={title} />
                <p className="popup__bigphoto-subtitle">{title}</p>
            </div>
        </section>
    );
}

export default PopupWithImage;