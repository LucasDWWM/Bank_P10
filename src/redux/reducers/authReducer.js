import { createSlice } from '@reduxjs/toolkit';

// État initial
const initialState = {
  isAuthenticated: false,
  token: null,
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
