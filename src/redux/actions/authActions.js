import axios from "axios";

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/user/login", credentials);
    const token = response.data.body.token;

    dispatch({ type: "LOGIN_SUCCESS", payload: token });
    return { success: true };
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE" });
    return { success: false, message: error.response?.data?.message || "Login error" };
  }
};
