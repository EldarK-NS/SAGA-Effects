import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const initialState = {
  blog: [],
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case "BLOG_LOADED":
      return {
        ...state,
        blog: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  app: appReducer,
  router: connectRouter(history),
});

export default rootReducer;
