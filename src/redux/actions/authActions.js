import axios from "axios";
import { loginSuccess, logout } from "../reducers/authReducer";

// Connexion de l'utilisateur
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/user/login", credentials);
    const token = response.data.body.token;

    // Stockage du token dans le localStorage
    const profileRes = await axios.get("http://localhost:3001/api/v1/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = profileRes.data.body;

    dispatch(loginSuccess({ token, user })); // ici on utilise l'action du slice 
    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Login error",
    };
  }
};

// Déconnexion de l'utilisateur
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(logout()); // ici on fait appel à l'action du slice
};

// Mise à jour du username
export const updateUsername = (newUsername) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;

    const response = await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      { userName: newUsername },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const updatedUser = response.data.body;

    // On met à jour uniquement user, on garde le token tel quel
    dispatch(loginSuccess({ token, user: updatedUser }));
  } catch (error) {
    console.error("Failed to update username", error);
  }
};
