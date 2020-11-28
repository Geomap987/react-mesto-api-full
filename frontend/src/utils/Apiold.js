class Api {
  constructor({ address, token, groupId }) {
    this._address = address;
    this._token = token;
    this._groupId = groupId;
  }

  getInitialInfo() {
    return Promise.all([this.getUserInfo(), this.getCardList()]);
  }

  getUserInfo() {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  editUserAvatar({ avatar }) {
    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  getCardList() {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  createCard({ name, link }) {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
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
    return fetch(`${this._address}/${this._groupId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  likeCard(cardId, isLiked) {
    let methodValue;
    isLiked ? (methodValue = "DELETE") : (methodValue = "PUT");
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardId}`, {
      method: methodValue,
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }
}

export const api = new Api({
  address: "https://mesto.nomoreparties.co/v1",
  token: "3a4b08db-7c45-4ccb-8ab5-c20c75737af9",
  groupId: "cohort-14",
});
