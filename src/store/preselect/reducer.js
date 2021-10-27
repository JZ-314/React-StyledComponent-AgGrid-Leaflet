import {
  SET_PRESELECT_PARAMS,
  PRE_SELECT_REQUEST,
  PRE_SELECT_SUCCESS,
  PRE_SELECT_FAILURE,
} from "./constants";

const initialState = {
  data: {},
  params: null,
  loading: false,
  errors: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRESELECT_PARAMS:
      return { ...state, loading: false, params: action.payload, errors: [] };
    case PRE_SELECT_REQUEST:
      return { ...state, loading: true };
    case PRE_SELECT_SUCCESS:
      return { ...state, loading: false, data: action.payload, errors: [] };
    case PRE_SELECT_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    default:
      return state;
  }
};

export default reducer;
