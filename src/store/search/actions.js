import Axios from "../../utils/Axios";

import {
  SET_SEARCH_SELECT_QUERY,
  SET_SEARCH_PARAMS,
  FETCH_MAIN_SEARCH_REQUEST,
  FETCH_MAIN_SEARCH_SUCCESS,
  FETCH_MAIN_SEARCH_FAILURE,
} from "./constants";

export const setSearchSelectQuery = (payload) => ({
  type: SET_SEARCH_SELECT_QUERY,
  payload,
});

export const setSearchParams = (payload) => ({
  type: SET_SEARCH_PARAMS,
  payload,
});

const fetchMainSearchRequest = () => ({ type: FETCH_MAIN_SEARCH_REQUEST });
const fetchMainSearchSuccess = (payload) => ({
  type: FETCH_MAIN_SEARCH_SUCCESS,
  payload,
});
const fetchMainSearchFailure = (errors) => ({
  type: FETCH_MAIN_SEARCH_FAILURE,
  errors,
});

export const fetchMainSearch =
  (search, payload, searchType) => async (dispatch) => {
    dispatch(fetchMainSearchRequest());
    try {
      let response;

      if (search === "name") {
        response = await Axios.post(`/v1/main/search/name`, payload);
      } else if (search === "select") {
        response = await Axios.post(`/v1/main/text/search`, payload);
      }

      if (response.status === 200) {
        if (response.data.success) {
          if (searchType === "select-additional") {
            // return dispatch(fetchMainSearchByTypeSuccess(response.data));
          }
          return dispatch(fetchMainSearchSuccess(response.data));
        }
      }
      return dispatch(fetchMainSearchFailure(response.data.message));
    } catch (e) {
      return dispatch(fetchMainSearchFailure(e));
    }
  };
