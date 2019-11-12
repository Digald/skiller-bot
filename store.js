import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  user: {},
  users: [],
  singlePoke: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET-USER":
      return {
        ...state,
        user: action.data
      };
    default:
      return state;
  }
};

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
};
