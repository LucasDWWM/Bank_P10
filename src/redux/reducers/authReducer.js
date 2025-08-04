import { createSlice } from '@reduxjs/toolkit';

// Ici tu définis l'état initial de ton reducer
// Par exemple, pour un reducer d'authentification : 
const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

// Création du slice pour l'authentification
// Tu peux ajouter des reducers pour gérer les actions comme login, logout, etc.
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer pour gérer la connexion réussie
    // Il peut mettre à jour l'état avec le token et les informations de l'utilisateur
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      // On suppose que action.payload contient le token et les informations de l'utilisateur
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    // Reducer pour gérer la déconnexion
    // Il remet l'état à son état initial
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});

// Export des actions et du reducer
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
