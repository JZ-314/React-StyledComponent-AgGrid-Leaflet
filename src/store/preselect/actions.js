import Axios from "../../utils/Axios";

import {
  SET_PRESELECT_PARAMS,
  PRE_SELECT_REQUEST,
  PRE_SELECT_SUCCESS,
  PRE_SELECT_FAILURE,
} from "./constants";

export const setPreselectParams = (payload) => ({
  type: SET_PRESELECT_PARAMS,
  payload,
});

const fetchPreSelectRequest = () => ({ type: PRE_SELECT_REQUEST });
const fetchPreSelectSuccess = (payload) => ({
  type: PRE_SELECT_SUCCESS,
  payload,
});
const fetchPreSelectFailure = (errors) => ({
  type: PRE_SELECT_FAILURE,
  errors,
});

export const fetchPreSelect = (payload) => async (dispatch) => {
  dispatch(fetchPreSelectRequest());
  try {
    const response = await Axios.post("/v1/preselect", payload);
    if (response.status === 200) {
      if (response.data.success) {
        return dispatch(fetchPreSelectSuccess(response.data));
      }
    }
    return dispatch(fetchPreSelectFailure(response.data.message));
  } catch (e) {
    return dispatch(fetchPreSelectFailure(e));
  }
};
