import axios from "axios";

// Action pour l'authentification de l'utilisateur
export const loginUser = (credentials) => async (dispatch) => {
    // Envoie une requête POST à l'API pour authentifier l'utilisateur
  try {
    // Remplacez l'URL par celle de mon API
    const response = await axios.post("http://localhost:3001/api/v1/user/login", credentials);
    // Si la requête réussit, on récupère le token et on le stocke dans le state
    const token = response.data.body.token;

    // Dispatch de l'action pour mettre à jour le state avec le token
    dispatch({ type: "LOGIN_SUCCESS", payload: token });
    return { success: true };
  } catch (error) { // Si la requête échoue, on gère l'erreur
    dispatch({ type: "LOGIN_FAILURE" });
    return { success: false, message: error.response?.data?.message || "Login error" };
  }
};
