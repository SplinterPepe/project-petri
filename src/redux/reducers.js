import { combineReducers } from "redux";

const data = (
  state = {
    nodes: [
      { id: "T1", nodeType: "transition" },
      { id: "P1", nodeType: "place", marks: "3" },
      { id: "P2", nodeType: "place", marks: "3" },
      { id: "P3", nodeType: "place", marks: "3" },
      { id: "P4", nodeType: "place", marks: "3" }
    ],
    links: [
      { source: "P1", target: "T1" },
      { source: "T1", target: "P2" },
      { source: "P3", target: "T1" },
      { source: "T1", target: "P4" }
    ]
  },
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  data
});
