import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  user: {},
  users: [],
  singlePoke: {},
  isModalToggled: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    case "UPDATE-TEAM":
      const pokemonToPutOnTeam = state.user.pokemon.map(poke => {
        if (poke._id === action.data) {
          poke.isOnTeam = !poke.isOnTeam;
          return poke;
        }
        return poke;
      });
      return {
        ...state,
        user: {
          ...state.user,
          pokemon: pokemonToPutOnTeam
        }
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
