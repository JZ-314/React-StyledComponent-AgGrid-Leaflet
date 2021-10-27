import Axios from "../../utils/Axios";

import {
  FETCH_MAIN_TABLE_REQUEST,
  FETCH_MAIN_TABLE_SUCCESS,
  FETCH_MAIN_TABLE_FAILURE,
  FETCH_MAIN_CITATION_REQUEST,
  FETCH_MAIN_CITATION_SUCCESS,
  FETCH_MAIN_CITATION_FAILURE,
  FETCH_MAIN_MAP_DATA_REQUEST,
  FETCH_MAIN_MAP_DATA_SUCCESS,
  FETCH_MAIN_MAP_DATA_FAILURE,
  FETCH_MAIN_TEXT_REQUEST,
  FETCH_MAIN_TEXT_SUCCESS,
  FETCH_MAIN_TEXT_FAILURE,
  SET_MAIN_TABLE_COLUMNS,
  SET_MAIN_TABLE_PARAMS,
  FETCH_MAIN_CATALOG_REQUEST,
  FETCH_MAIN_CATALOG_SUCCESS,
  FETCH_MAIN_CATALOG_FAILURE,
} from "./constants";

export const setMainTableParams = (payload) => ({
  type: SET_MAIN_TABLE_PARAMS,
  payload,
});

const fetchMainTableRequest = () => ({ type: FETCH_MAIN_TABLE_REQUEST });
const fetchMainTableSuccess = (payload) => ({
  type: FETCH_MAIN_TABLE_SUCCESS,
  payload,
});
const fetchMainTableFailure = (errors) => ({
  type: FETCH_MAIN_TABLE_FAILURE,
  errors,
});

export const fetchMainTable = (payload) => async (dispatch) => {
  dispatch(fetchMainTableRequest());
  try {
    const response = await Axios.post("/v1/main/maya", payload);
    if (response.status === 200) {
      if (response.data.success) {
        return dispatch(fetchMainTableSuccess(response.data));
      }
    }
    return dispatch(fetchMainTableFailure(response.data.message));
  } catch (e) {
    return dispatch(fetchMainTableFailure(e));
  }
};

const fetchMainTextCitationRequest = () => ({
  type: FETCH_MAIN_CITATION_REQUEST,
});
const fetchMainTextCitationSuccess = (payload) => ({
  type: FETCH_MAIN_CITATION_SUCCESS,
  payload,
});
const fetchMainTextCitationFailure = (errors) => ({
  type: FETCH_MAIN_CITATION_FAILURE,
  errors,
});

export const fetchMainTextCitation = (payload) => async (dispatch) => {
  dispatch(fetchMainTextCitationRequest());
  try {
    const response = await Axios.get(`/v1/main/textcitation/${payload}`);
    if (response.status === 200) {
      if (response.data.success) {
        return dispatch(fetchMainTextCitationSuccess(response.data));
      }
    }
    return dispatch(fetchMainTextCitationFailure(response.data.message));
  } catch (e) {
    return dispatch(fetchMainTextCitationFailure(e));
  }
};

const fetchMainMapDataRequest = () => ({
  type: FETCH_MAIN_MAP_DATA_REQUEST,
});
const fetchMainMapDataSuccess = (payload) => ({
  type: FETCH_MAIN_MAP_DATA_SUCCESS,
  payload,
});
const fetchMainMapDataFailure = (errors) => ({
  type: FETCH_MAIN_MAP_DATA_FAILURE,
  errors,
});

export const fetchMainMapData = (params) => async (dispatch) => {
  dispatch(fetchMainMapDataRequest());
  try {
    const response = await Axios.post(`/v1/main/mayamap`, params);
    if (response.status === 200) {
      if (response.data.success) {
        return dispatch(fetchMainMapDataSuccess(response.data));
      }
    }
    return dispatch(fetchMainMapDataFailure(response.data.message));
  } catch (e) {
    return dispatch(fetchMainMapDataFailure(e));
  }
};

const fetchMainTextRequest = () => ({
  type: FETCH_MAIN_TEXT_REQUEST,
});
const fetchMainTextSuccess = (payload) => ({
  type: FETCH_MAIN_TEXT_SUCCESS,
  payload,
});
const fetchMainTextFailure = (errors) => ({
  type: FETCH_MAIN_TEXT_FAILURE,
  errors,
});

export const fetchMainText = (param) => async (dispatch) => {
  dispatch(fetchMainTextRequest());
  try {
    const response = await Axios.post(`/v1/main/text/pncode`, param);
    if (response.status === 200) {
      if (response.data.success) {
        return dispatch(fetchMainTextSuccess(response.data));
      }
    }
    return dispatch(fetchMainTextFailure(response.data.message));
  } catch (e) {
    return dispatch(fetchMainTextFailure(e));
  }
};

const fetchMainCatalogRequest = () => ({
  type: FETCH_MAIN_CATALOG_REQUEST,
});
const fetchMainCatalogSuccess = (payload) => ({
  type: FETCH_MAIN_CATALOG_SUCCESS,
  payload,
});
const fetchMainCatalogFailure = (errors) => ({
  type: FETCH_MAIN_CATALOG_FAILURE,
  errors,
});

export const fetchMainCatalog = (params) => async (dispatch) => {
  dispatch(fetchMainCatalogRequest());
  try {
    const response = await Axios.post(`/v1/main/cattoblock`, params);
    if (response.status === 200) {
      if (response.data.success) {
        return dispatch(fetchMainCatalogSuccess(response.data));
      }
    }
    return dispatch(fetchMainCatalogFailure(response.data.message));
  } catch (e) {
    return dispatch(fetchMainCatalogFailure(e));
  }
};

export const setMainTableColumns = (payload) => ({
  type: SET_MAIN_TABLE_COLUMNS,
  payload,
});
