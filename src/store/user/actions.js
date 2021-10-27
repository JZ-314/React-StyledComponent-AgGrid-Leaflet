import Axios from "../../utils/Axios";

import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "./constants";

const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });
const fetchUserSuccess = (payload) => ({ type: FETCH_USER_SUCCESS, payload });
const fetchUserFailure = (errors) => ({ type: FETCH_USER_FAILURE, errors });

export const fetchUser = () => async (dispatch) => {
  dispatch(fetchUserRequest());
  try {
    const response = await Axios.get("/me");
    if (response.status === 200) {
      return dispatch(fetchUserSuccess(response.data));
    }
    return dispatch(fetchUserFailure(response.data.message));
  } catch (e) {
    return dispatch(fetchUserFailure(e));
  }
};

const createUserRequest = () => ({ type: CREATE_USER_REQUEST });
const createUserSuccess = (payload) => ({ type: CREATE_USER_SUCCESS, payload });
const createUserFailure = (errors) => ({ type: CREATE_USER_FAILURE, errors });

export const createUser = (params) => async (dispatch) => {
  dispatch(createUserRequest());
  try {
    const response = await Axios.post("/v1/users", params);
    if (response.status === 200) {
      return dispatch(createUserSuccess(response.data));
    }
    return dispatch(createUserFailure(response.data.message));
  } catch (e) {
    return dispatch(createUserFailure(e));
  }
};

const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST });
const updateUserSuccess = (payload) => ({ type: UPDATE_USER_SUCCESS, payload });
const updateUserFailure = (errors) => ({ type: UPDATE_USER_FAILURE, errors });

export const updateUser = (userId, params) => async (dispatch) => {
  dispatch(updateUserRequest());
  try {
    const response = await Axios.put(`/users/${userId}`, {
      ...params,
    });
    if (response.status === 200) {
      return dispatch(updateUserSuccess(response.data));
    }
    return dispatch(updateUserFailure(response.data.message));
  } catch (e) {
    return dispatch(updateUserFailure(e));
  }
};
