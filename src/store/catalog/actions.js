import Axios from "../../utils/Axios";

import {
  FETCH_CATALOG_REQUEST,
  FETCH_CATALOG_SUCCESS,
  FETCH_CATALOG_FAILURE,
  FETCH_LEXICAL_REQUEST,
  FETCH_LEXICAL_SUCCESS,
  FETCH_LEXICAL_FAILURE,
  FETCH_COMPLEMENTATION_REQUEST,
  FETCH_COMPLEMENTATION_SUCCESS,
  FETCH_COMPLEMENTATION_FAILURE,
  FETCH_SUBSTITUTION_REQUEST,
  FETCH_SUBSTITUTION_SUCCESS,
  FETCH_SUBSTITUTION_FAILURE,
  FETCH_CITATION_REQUEST,
  FETCH_CITATION_SUCCESS,
  FETCH_CITATION_FAILURE,
  SET_CATALOG_PARAMS,
  FETCH_MAIN_CATALOG_REQUEST,
  FETCH_MAIN_CATALOG_SUCCESS,
  FETCH_MAIN_CATALOG_FAILURE,
} from "./constants";

export const setCatalogParams = (payload) => ({
  type: SET_CATALOG_PARAMS,
  payload,
});

const fetchCatalogRequest = () => ({ type: FETCH_CATALOG_REQUEST });
const fetchCatalogSuccess = (payload) => ({
  type: FETCH_CATALOG_SUCCESS,
  payload,
});
const fetchCatalogFailure = (errors) => ({
  type: FETCH_CATALOG_FAILURE,
  errors,
});

export const fetchCatalog = (params) => async (dispatch) => {
  dispatch(fetchCatalogRequest());
  try {
    const response = await Axios.post(`/v1/main/catalog`, params);
    if (response.status === 200) {
      if (response.data.success) {
        return dispatch(fetchCatalogSuccess(response.data));
      }
    }
    return dispatch(fetchCatalogFailure(response.data.message));
  } catch (e) {
    return dispatch(fetchCatalogFailure(e));
  }
};

const fetchLexicalRequest = () => ({ type: FETCH_LEXICAL_REQUEST });
const fetchLexicalSuccess = (payload) => ({
  type: FETCH_LEXICAL_SUCCESS,
  payload,
});
const fetchLexicalFailure = (errors) => ({
  type: FETCH_LEXICAL_FAILURE,
  errors,
});

export const fetchLexical = (payload) => async (dispatch) => {
  dispatch(fetchLexicalRequest());
  try {
    const response = await Axios.get(`/v1/main/lexical/${payload}`);
    if (response.status === 200) {
      if (response.data.success) {
        return dispatch(fetchLexicalSuccess(response.data));
      }
    }
    return dispatch(fetchLexicalFailure(response.data.message));
  } catch (e) {
    return dispatch(fetchLexicalFailure(e));
  }
};

const fetchComplementationRequest = () => ({
  type: FETCH_COMPLEMENTATION_REQUEST,
});
const fetchComplementationSuccess = (payload) => ({
  type: FETCH_COMPLEMENTATION_SUCCESS,
  payload,
});
const fetchComplementationFailure = (errors) => ({
  type: FETCH_COMPLEMENTATION_FAILURE,
  errors,
});

export const fetchComplementation = (payload) => async (dispatch) => {
  dispatch(fetchComplementationRequest());
  try {
    const response = await Axios.get(`/v1/main/complementation/${payload}`);
    if (response.status === 200) {
      if (response.data.success) {
        return dispatch(fetchComplementationSuccess(response.data));
      }
    }
    return dispatch(fetchComplementationFailure(response.data.message));
  } catch (e) {
    return dispatch(fetchComplementationFailure(e));
  }
};

const fetchSubstitutionRequest = () => ({ type: FETCH_SUBSTITUTION_REQUEST });
const fetchSubstitutionSuccess = (payload) => ({
  type: FETCH_SUBSTITUTION_SUCCESS,
  payload,
});
const fetchSubstitutionFailure = (errors) => ({
  type: FETCH_SUBSTITUTION_FAILURE,
  errors,
});

export const fetchSubstitution = (payload) => async (dispatch) => {
  dispatch(fetchSubstitutionRequest());
  try {
    const response = await Axios.get(`/v1/main/substitution/${payload}`);
    if (response.status === 200) {
      if (response.data.success) {
        return dispatch(fetchSubstitutionSuccess(response.data));
      }
    }
    return dispatch(fetchSubstitutionFailure(response.data.message));
  } catch (e) {
    return dispatch(fetchSubstitutionFailure(e));
  }
};

const fetchCitationRequest = () => ({ type: FETCH_CITATION_REQUEST });
const fetchCitationSuccess = (payload) => ({
  type: FETCH_CITATION_SUCCESS,
  payload,
});
const fetchCitationFailure = (errors) => ({
  type: FETCH_CITATION_FAILURE,
  errors,
});

export const fetchCitation = (payload) => async (dispatch) => {
  dispatch(fetchCitationRequest());
  try {
    const response = await Axios.get(`/v1/main/citation/${payload}`);
    if (response.status === 200) {
      if (response.data.success) {
        return dispatch(fetchCitationSuccess(response.data));
      }
    }
    return dispatch(fetchCitationFailure(response.data.message));
  } catch (e) {
    return dispatch(fetchCitationFailure(e));
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

export const fetchMainCatalog = (param) => async (dispatch) => {
  dispatch(fetchMainCatalogRequest());
  try {
    const response = await Axios.get(`/v1/main/catalog/${param}`);
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
