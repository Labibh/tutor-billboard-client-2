import { POSTAD_SUCCESS, POSTAD_FAIL } from "../actions/types";

const myAd = JSON.parse(localStorage.getItem("myAd"));

const initialState = myAd ? { myAd } : { myAd: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POSTAD_SUCCESS:
      return {
        ...state,
        myAd: payload.myAd,
      };
    case POSTAD_FAIL:
      return {
        ...state,
        myAd: null,
      };
    default:
      return state;
  }
}
