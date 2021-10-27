import Axios from "../../utils/Axios";
import * as TokenService from "../../services/TokenService";

import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  SET_IMPERSONATING,
  LOGOUT,
  OPEN_MODAL,
  CLOSE_MODAL,
  TOGGLE_MODAL,
  CLICK_DOWNLOAD,
  QUERY_MENU,
  LANDING_NAV_MENU,
  FETCH_ACCESS_TOKEN,
  EMAIL_VERIFICATION_REQUEST,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_FAILURE,
} from "./constants";

const authenticateRequest = () => ({ type: AUTHENTICATE_REQUEST });
const authenticateSuccess = (payload) => ({
  type: AUTHENTICATE_SUCCESS,
  payload,
});
const authenticateFailure = (errors) => ({
  type: AUTHENTICATE_FAILURE,
  errors,
});

export const authenticate = (params) => async (dispatch) => {
  dispatch(authenticateRequest());
  try {
    const response = await Axios.post("/v1/oauth/token", params);

    if (response?.data?.access_token) {
      TokenService.setAccessToken(response.data);
      return dispatch(authenticateSuccess(response.data));
    }
    return dispatch(authenticateFailure("Failed to log in"));
  } catch (e) {
    return dispatch(authenticateFailure(e));
  }
};

export const setAuthenticated = () => ({ type: AUTHENTICATE_SUCCESS });

export const setImpersonating = (payload) => ({
  type: SET_IMPERSONATING,
  payload,
});

export const fetchAccessToken = () => (dispatch) => {
  return dispatch({
    type: FETCH_ACCESS_TOKEN,
    payload: TokenService.getAccessToken(),
  });
};

const emailVerificationRequest = () => ({ type: EMAIL_VERIFICATION_REQUEST });
const emailVerificationSuccess = (payload) => ({
  type: EMAIL_VERIFICATION_SUCCESS,
  payload,
});
const emailVerificationFailure = (errors) => ({
  type: EMAIL_VERIFICATION_FAILURE,
  errors,
});
export const emailVerification = (params) => async (dispatch) => {
  dispatch(emailVerificationRequest());
  try {
    const response = await Axios.post("/v1/oauth/token", params);

    if (response?.data?.access_token) {
      return dispatch(emailVerificationSuccess(response.data));
    }
    return dispatch(emailVerificationFailure("Failed to log in"));
  } catch (e) {
    return dispatch(emailVerificationFailure(e));
  }
};

export const logout = () => ({ type: LOGOUT });

export const openModal = (payload) => ({ type: OPEN_MODAL, payload });
export const closeModal = () => ({ type: CLOSE_MODAL });
export const toggleModal = () => ({ type: TOGGLE_MODAL });

export const setLandingNavMenu = (payload) => ({
  type: LANDING_NAV_MENU,
  payload,
});

export const setQueryMenu = (payload) => ({
  type: QUERY_MENU,
  payload,
});

export const clickDownload = (payload) => ({ type: CLICK_DOWNLOAD, payload });
