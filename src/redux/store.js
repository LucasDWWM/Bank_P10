import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';

// Création du store Redux
// On utilise configureStore de Redux Toolkit pour simplifier la configuration
const store = configureStore({
    // On ajoute le reducer d'authentification au store
  reducer: {
    // Ici on ajoute le reducer d'authentification
    auth: authReducer,
  },
});

export default store;
