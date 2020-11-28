import React from 'react';
import { useHistory } from 'react-router-dom';
import Main from './Main.js';
import Footer from './Footer.js';
import Header from './Header.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardContext } from '../contexts/CurrentCardContext';
import { removeToken } from '../utils/token';

const Mesto = (props) => {
 
    const currentUser = React.useContext(CurrentUserContext);
    const history = useHistory();
    const selectedCard = React.useContext(CurrentCardContext);

    function signOut() {
        removeToken();
        history.push('/sign-in');
    }

    return (
        <div className="page">
            <Header userEmail={currentUser.email} buttonLink={`/sign-in`} buttonText={`Выйти`} handleClick={signOut} />
            <Main
                onEditAvatar={props.onEditAvatar}
                onEditProfile={props.onEditProfile}
                openAddPlace={props.openAddPlace}
                onCardClick={props.onCardClick}
                onCardDelete={props.onCardDelete}
                onCardLike={props.onCardLike}  
                cards={props.cards}              
            />
            <Footer />
            <EditProfilePopup 
            isOpen={props.isEditProfilePopupOpen} 
            onClose={props.closeAllPopups} 
            onUpdateUser={props.handleUpdateUser} />
            <EditAvatarPopup 
            isOpen={props.isEditAvatarPopupOpen} 
            onClose={props.closeAllPopups} 
            onUpdateAvatar={props.handleUpdateAvatar} />
            <AddPlacePopup 
            titleR={''} 
            onClose={props.closeAllPopups} 
            isOpen={props.isAddPlacePopupOpen} 
            onAddPlace={props.handleAddPlaceSubmit} />
            <PopupWithForm 
            name={`confirm`} 
            title={`Вы уверены?`} 
            buttonText={`Да`} />
            <PopupWithImage 
            onClose={props.closeAllPopups} 
            isOpen={selectedCard.link} 
            image={selectedCard.link} 
            title={selectedCard.name} />
        </div>
    )
}

export default Mesto;