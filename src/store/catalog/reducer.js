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

const initialState = {
  data: {},
  params: null,
  lexical: [],
  complementation: [],
  substitution: [],
  citations: [],
  loading: false,
  errors: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATALOG_PARAMS:
      return { ...state, loading: false, params: action.payload, errors: [] };
    case FETCH_CATALOG_REQUEST:
      return { ...state, loading: true };
    case FETCH_CATALOG_SUCCESS:
      return { ...state, loading: false, data: action.payload, errors: [] };
    case FETCH_CATALOG_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case FETCH_LEXICAL_REQUEST:
      return { ...state, loading: true };
    case FETCH_LEXICAL_SUCCESS:
      return { ...state, loading: false, lexical: action.payload, errors: [] };
    case FETCH_LEXICAL_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case FETCH_COMPLEMENTATION_REQUEST:
      return { ...state, loading: true };
    case FETCH_COMPLEMENTATION_SUCCESS:
      return {
        ...state,
        loading: false,
        complementation: action.payload,
        errors: [],
      };
    case FETCH_COMPLEMENTATION_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case FETCH_SUBSTITUTION_REQUEST:
      return { ...state, loading: true };
    case FETCH_SUBSTITUTION_SUCCESS:
      return {
        ...state,
        loading: false,
        substitution: action.payload,
        errors: [],
      };
    case FETCH_SUBSTITUTION_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case FETCH_CITATION_REQUEST:
      return { ...state, loading: true };
    case FETCH_CITATION_SUCCESS:
      return {
        ...state,
        loading: false,
        citations: action.payload,
        errors: [],
      };
    case FETCH_CITATION_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case FETCH_MAIN_CATALOG_REQUEST:
      return { ...state, loading: true };
    case FETCH_MAIN_CATALOG_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        errors: [],
      };
    case FETCH_MAIN_CATALOG_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    default:
      return state;
  }
};

export default reducer;
