import { combineReducers } from "redux";

import app from "./app/reducer";
import user from "./user/reducer";
import main from "./main/reducer";
import catalog from "./catalog/reducer";
import preselect from "./preselect/reducer";
import wordList from "./wordList/reducer";
import search from "./search/reducer";

const rootReducer = combineReducers({
  app,
  user,
  main,
  catalog,
  preselect,
  wordList,
  search,
});

export default rootReducer;
