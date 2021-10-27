import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  SET_IMPERSONATING,
  LOGOUT,
  OPEN_MODAL,
  CLOSE_MODAL,
  CLICK_DOWNLOAD,
  TOGGLE_MODAL,
  LANDING_NAV_MENU,
  QUERY_MENU,
  FETCH_ACCESS_TOKEN,
  EMAIL_VERIFICATION_REQUEST,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_FAILURE,
} from "./constants";

const initialState = {
  authenticated: false,
  impersonating: false,
  modalOpen: false,
  clickDownload: false,
  currentModal: null,
  modalParams: {},
  modalWidth: "",
  loading: false,
  errors: [],
  landingNavMenu: "",
  queryMenu: [],
  userToken: {
    access_token: "",
    expires_in: 3600,
    refresh_token: "",
    token_type: "Bearer",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_REQUEST:
      return { ...state, loading: true };
    case AUTHENTICATE_SUCCESS:
      return { ...state, loading: false, authenticated: true, errors: [] };
    case AUTHENTICATE_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case SET_IMPERSONATING:
      return { ...state, impersonating: action.payload };
    case FETCH_ACCESS_TOKEN:
      return {
        ...state,
        loading: false,
        userToken: action.payload,
        errors: [],
      };
    case EMAIL_VERIFICATION_REQUEST:
      return { ...state, loading: true };
    case EMAIL_VERIFICATION_SUCCESS:
      return { ...state, loading: false, authenticated: false, errors: [] };
    case EMAIL_VERIFICATION_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case LOGOUT:
      return { ...state, loading: false, authenticated: false, errors: [] };
    case OPEN_MODAL:
      return {
        ...state,
        modalOpen: true,
        currentModal: action.payload.modal,
        modalParams: action.payload.params,
      };
    case CLOSE_MODAL:
      return { ...state, modalOpen: false, currentModal: null, params: {} };
    case TOGGLE_MODAL:
      return { ...state, modalOpen: !state.modalOpen };
    case CLICK_DOWNLOAD:
      return { ...state, clickDownload: action.payload, params: {} };
    case LANDING_NAV_MENU:
      return { ...state, landingNavMenu: action.payload };
    case QUERY_MENU:
      return { ...state, queryMenu: action.payload };
    default:
      return state;
  }
};

export default reducer;
