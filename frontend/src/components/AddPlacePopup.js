import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace, titleR }) {
    const linkRef = React.useRef();
    const titleRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: titleRef.current.value,
            link: linkRef.current.value
        });
        
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} name={`addphoto`} title={`Новое место`} buttonText={`Создать`}>
            <input ref={titleRef} type="text" id="photoplace" name="name" placeholder="Название" className="popup__input popup__input_title" pattern="[a-zA-ZА-ЯЁа-яё\s\d\-]+" minLength="2" maxLength="40" required />
            <span className='popup__input-error' id="photoplace-error"></span>
            <input ref={linkRef} type="url" id="photolink" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_subtitle" required />
            <span className='popup__input-error' id="photolink-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;