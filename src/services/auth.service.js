import axios from "axios";

const API_URL = "/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstName, lastName, email, password) {
    return axios.post(API_URL + "signup", {
      firstName,
      lastName,
      email,
      password,
    });
  }
}

export default new AuthService();
