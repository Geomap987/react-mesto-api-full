# Project: Mesto

This repository contains the **Mesto** application, including both the frontend and backend parts of the project. The application supports user registration and authorization, as well as operations related to cards and users.

The backend is located in the `backend/` directory, and the frontend is located in the `frontend/` directory.

## Features
- Built with React
- Connected to a backend server
- Fetches user profile data from the server
- Fetches cards from the server
- Supports profile editing, including avatar updates
- Displays like counters
- Allows users to delete their own cards
- Supports user registration and authentication

## Description

Mesto is a React-based project connected to a backend server. It supports both fetching and sending data through an API.

The project includes the following functionality:
- editing user profile information
- changing the user avatar
- displaying the number of likes on each card
- deleting only cards created by the current user
- showing a confirmation popup before deleting a card
- user registration and login

## Technologies Used

- React functional components
- React hooks: `useState`, `useEffect`, `useContext`, `useRef`
- Responsive layout with media queries
- Flexbox
- CSS Grid
- API integration for working with server data
- Popup handling through conditional class modifiers
