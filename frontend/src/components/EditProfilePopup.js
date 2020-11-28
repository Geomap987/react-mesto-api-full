import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleName(e) {
    setName(e.target.value);
  }
  function handleDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} name={`profile`} title={`Редактировать профиль`} buttonText={`Сохранить`}>
      <input onChange={handleName} type="text" id="profilename" name="name" placeholder="Имя" value={name} className="popup__input popup__input_title" pattern="[a-zA-ZА-ЯЁа-яё\s\-]+" minLength="2" maxLength="40" required />
      <span className="popup__input-error" id="profilename-error"></span>
      <input onChange={handleDescription} type="text" id="profilejob" name="about" placeholder="Занятие" value={description} className="popup__input popup__input_subtitle" minLength="2" maxLength="200" required />
      <span className='popup__input-error' id="profilejob-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;