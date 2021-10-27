import Axios from "../../utils/Axios";

import {
  SET_WORD_LIST_PARAMS,
  FETCH_MAIN_WORD_LIST_REQUEST,
  FETCH_MAIN_WORD_LIST_SUCCESS,
  FETCH_MAIN_WORD_LIST_FAILURE,
} from "./constants";

export const setWordListParams = (payload) => ({
  type: SET_WORD_LIST_PARAMS,
  payload,
});

const fetchMainWordListRequest = () => ({ type: FETCH_MAIN_WORD_LIST_REQUEST });
const fetchMainWordListSuccess = (payload) => ({
  type: FETCH_MAIN_WORD_LIST_SUCCESS,
  payload,
});
const fetchMainWordListFailure = (errors) => ({
  type: FETCH_MAIN_WORD_LIST_FAILURE,
  errors,
});

export const fetchMainWordList = (payload) => async (dispatch) => {
  dispatch(fetchMainWordListRequest());
  try {
    const response = await Axios.post("/v1/main/wordlist", payload);
    if (response.status === 200) {
      if (response.data.success) {
        return dispatch(fetchMainWordListSuccess(response.data));
      }
    }
    return dispatch(fetchMainWordListFailure(response.data.message));
  } catch (e) {
    return dispatch(fetchMainWordListFailure(e));
  }
};
