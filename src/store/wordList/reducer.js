import {
  SET_WORD_LIST_PARAMS,
  FETCH_MAIN_WORD_LIST_REQUEST,
  FETCH_MAIN_WORD_LIST_SUCCESS,
  FETCH_MAIN_WORD_LIST_FAILURE,
} from "./constants";

const initialState = {
  data: {},
  params: null,
  loading: false,
  errors: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORD_LIST_PARAMS:
      return { ...state, loading: false, params: action.payload, errors: [] };
    case FETCH_MAIN_WORD_LIST_REQUEST:
      return { ...state, loading: true };
    case FETCH_MAIN_WORD_LIST_SUCCESS:
      return { ...state, loading: false, data: action.payload, errors: [] };
    case FETCH_MAIN_WORD_LIST_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    default:
      return state;
  }
};

export default reducer;
