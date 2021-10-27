import {
  SET_SEARCH_SELECT_QUERY,
  SET_SEARCH_PARAMS,
  FETCH_MAIN_SEARCH_REQUEST,
  FETCH_MAIN_SEARCH_SUCCESS,
  FETCH_MAIN_SEARCH_FAILURE,
} from "./constants";

const initialState = {
  data: {},
  params: null,
  selectQuery: null,
  loading: false,
  errors: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_SELECT_QUERY:
      return {
        ...state,
        loading: false,
        selectQuery: action.payload,
        error: [],
      };
    case SET_SEARCH_PARAMS:
      return { ...state, loading: false, params: action.payload, errors: [] };
    case FETCH_MAIN_SEARCH_REQUEST:
      return { ...state, loading: true };
    case FETCH_MAIN_SEARCH_SUCCESS:
      return { ...state, loading: false, data: action.payload, errors: [] };
    case FETCH_MAIN_SEARCH_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    default:
      return state;
  }
};

export default reducer;
