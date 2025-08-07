import { createSlice } from '@reduxjs/toolkit';

// token récupéré depuis le localStorage
// Il est utilisé pour vérifier si l'utilisateur est authentifié
const token = localStorage.getItem("token");

// Etat initial de l'authentification
const initialState = {
  // Le !! est utilisé pour convertir le token en booléen / isAuthenticated sera true si un token est présent, sinon false
  isAuthenticated: !!token,
  token,
  user: null,
};

// Slice pour l'authentification
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action pour la connexion réussie
    loginSuccess(state, action) {
      // Mise à jour de l'état avec le token et les informations utilisateur
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    // Action pour la déconnexion
    logout(state) {
      // Réinitialisation de l'état
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
