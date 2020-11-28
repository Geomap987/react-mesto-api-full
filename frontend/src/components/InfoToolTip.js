import React from 'react';

function InfoToolTip({ onClose, isOpen, image, title }) {
    return (
        <section className={isOpen ? `popup popup_opened` : `popup`}>
            <div className="popup__container ">
                <button onClick={onClose} type="button" className="popup__close-button"></button>
                <img src={image} className="popup__image" alt={title} />
                <p className="popup__subtitle">{title}</p>
            </div>
        </section>
    );
}

export default InfoToolTip;