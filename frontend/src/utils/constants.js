export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const avatarButton = document.querySelector(".profile__edit-pen");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const profileAvatar = document.querySelector(".profile__photo");
export const inputName = document.getElementById("profilename");
export const inputJob = document.getElementById("profilejob");
export const inputPlace = document.getElementById("photoplace");
export const inputLink = document.getElementById("photolink");
export const inputAvatar = document.getElementById("avatarlink");
export const cardTemplate = document.querySelector(".photo-grid__template")
  .content;
export const cardContainer = document.querySelector(".photo-grid__container");
export const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_invalid",
};
export function togglePreloader(show, preloaderSelector, text, originalText) {
  const preloader = document.querySelector(preloaderSelector);
  if (show) {
    preloader.textContent = text;
  } else {
    preloader.textContent = originalText;
  }
}
