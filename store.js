import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  user: {},
  users: [],
  singlePoke: {},
  isModalToggled: false,
  currentTeam: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE-POKEMON-TEAM":
      return {
        ...state,
        currentTeam: action.data
      };
    case "SET-USER":
      return {
        ...state,
        user: action.data
      };
    case "SET-ALL-USERS":
      return {
        ...state,
        users: action.data
      };
    case "SET-POKEMON":
      return {
        ...state,
        singlePoke: action.data,
        isModalToggled: true
      };
    case "OPEN-MODAL":
      return {
        ...state,
        isModalToggled: true
      };
    case "CLOSE-MODAL":
      return {
        ...state,
        isModalToggled: false
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
