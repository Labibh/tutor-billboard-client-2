import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUser() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
}

export default new UserService();
