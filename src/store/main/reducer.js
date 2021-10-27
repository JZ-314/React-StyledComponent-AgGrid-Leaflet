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
  SET_MAIN_TABLE_COLUMNS,
  SET_MAIN_TABLE_PARAMS,
  FETCH_MAIN_TEXT_REQUEST,
  FETCH_MAIN_TEXT_SUCCESS,
  FETCH_MAIN_TEXT_FAILURE,
  FETCH_MAIN_CATALOG_REQUEST,
  FETCH_MAIN_CATALOG_SUCCESS,
  FETCH_MAIN_CATALOG_FAILURE,
} from "./constants";

const initialState = {
  data: {},
  params: null,
  searchDataByType: {},
  mainTableColumns: null,
  textCitations: {},
  mapData: null,
  loading: false,
  errors: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAIN_TABLE_PARAMS:
      return { ...state, loading: false, params: action.payload, errors: [] };
    case FETCH_MAIN_TABLE_REQUEST:
      return { ...state, loading: true };
    case FETCH_MAIN_TABLE_SUCCESS:
      return { ...state, loading: false, data: action.payload, errors: [] };
    case FETCH_MAIN_TABLE_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case FETCH_MAIN_CITATION_REQUEST:
      return { ...state, loading: true };
    case FETCH_MAIN_CITATION_SUCCESS:
      return {
        ...state,
        loading: false,
        textCitations: action.payload,
        errors: [],
      };
    case FETCH_MAIN_CITATION_FAILURE:
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
    case FETCH_MAIN_MAP_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_MAIN_MAP_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        mapData: action.payload,
        errors: [],
      };
    case FETCH_MAIN_MAP_DATA_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case FETCH_MAIN_TEXT_REQUEST:
      return { ...state, loading: true };
    case FETCH_MAIN_TEXT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        errors: [],
      };
    case FETCH_MAIN_TEXT_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case SET_MAIN_TABLE_COLUMNS:
      return {
        ...state,
        loading: false,
        mainTableColumns: action.payload,
        errors: [],
      };
    default:
      return state;
  }
};

export default reducer;
