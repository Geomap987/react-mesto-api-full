import { getToken } from './token';

class Api {
    constructor({ address }) {
      this._address = address;
    }
  
    getInitialInfo() {
      return Promise.all([this.getUserInfo(), this.getCardList()]);
    }
  
    getUserInfo() {
      const token = getToken();
      return fetch(`${this._address}/users/me`, {
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      );
    }
  
    editUserInfo({ name, about }) {
      const token = getToken();
      return fetch(`${this._address}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, about }),
      }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      );
    }
  
    editUserAvatar({ avatar }) {
      const token = getToken();
      return fetch(`${this._address}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatar }),
      }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      );
    }
  
    getCardList() {
      const token = getToken();
      return fetch(`${this._address}/cards`, {
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      );
    }
  
    createCard({ name, link }) {
      const token = getToken();
      return fetch(`${this._address}/cards`, {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          link,
        }),
      }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      );
    }
  
    deleteCard(cardId) {
      const token = getToken();
      return fetch(`${this._address}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      );
    }
  
    likeCard(cardId, isLiked) {
      const token = getToken();
      let methodValue;
      isLiked ? (methodValue = "DELETE") : (methodValue = "PUT");
      return fetch(`${this._address}/cards/${cardId}/likes`, {
        method: methodValue,
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      );
    }
  }
  
  export const api = new Api({
    address: 'https://api.lumpyspace.students.nomoredomains.rocks',
  });

