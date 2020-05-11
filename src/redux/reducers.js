import { combineReducers } from "redux";
import {
  TOGGLE_EDIT_MENU,
  SUBMIT_TEMPORARY_STATE,
  SET_TEMPORARY_STATE_TO_CURRENT
} from "./actions";

const currentState = (
  state = {
    nodes: [
      { id: "T1", nodeType: "transition" },
      { id: "P1", nodeType: "place", marks: "3" },
      { id: "P2", nodeType: "place", marks: "0" }
    ],
    links: [
      { source: "P1", target: "T1" },
      { source: "T1", target: "P2" }
    ]
  },
  action
) => {
  switch (action.type) {
    case SET_TEMPORARY_STATE_TO_CURRENT:
      return action.payload;
    default:
      return state;
  }
};

const temporaryState = (state = { nodes: [], links: [] }, action) => {
  switch (action.type) {
    case SUBMIT_TEMPORARY_STATE:
      return action.payload;
    default:
      return state;
  }
};

const isEditMenuToggled = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_EDIT_MENU:
      return !state;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  currentState,
  temporaryState,
  isEditMenuToggled
});
