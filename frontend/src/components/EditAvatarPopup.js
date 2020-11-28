import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    avatarRef.current.value='';
  }
  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} name={`avatar`} title={`Обновить аватар`} buttonText={`Сохранить`}>
      <input ref={avatarRef} type="url" id="avatarlink" name="avatar" placeholder="Ссылка на аватар" className="popup__input popup__input_avatar" required />
      <span className='popup__input-error' id="avatarlink-error"></span>
    </PopupWithForm>
  )
}


export default EditAvatarPopup;