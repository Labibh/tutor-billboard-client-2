import { POSTAD_SUCCESS, POSTAD_FAIL } from "./types";

import PostAdService from "../services/postAd.service";

export const postAdAction =
  (imageUrl, education, location, rate, availability, subjects, aboutPerson) =>
  (dispatch) => {
    return PostAdService.postAdReq(
      imageUrl,
      education,
      location,
      rate,
      availability,
      subjects,
      aboutPerson
    ).then(
      (response) => {
        dispatch({
          type: POSTAD_SUCCESS,
          payload: { myAd: response },
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: POSTAD_FAIL,
        });
        return Promise.reject();
      }
    );
  };
