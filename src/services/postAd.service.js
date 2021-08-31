import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/postad";
const API_URL_t = "/api/test/";

class postAdService {
  postAdReq(
    imageUrl,
    education,
    location,
    rate,
    availability,
    subjects,
    aboutPerson
  ) {
    const user = JSON.parse(localStorage.getItem("user"));
    let email = user.email;
    return axios
      .post(
        API_URL,
        {
          email,
          imageUrl,
          education,
          location,
          rate,
          availability,
          subjects,
          aboutPerson,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        if (response.data.myAd) {
          localStorage.setItem("myAd", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  getUser() {
    return axios.get(API_URL_t + "user", { headers: authHeader() });
  }
}

export default new postAdService();
