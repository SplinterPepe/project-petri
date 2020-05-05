import { combineReducers } from "redux";

const data = (
  state = {
    nodes: [
      { id: "P1", marks: "3" },
      { id: "T1", symbolType: "square" },
      { id: "P2", marks: "3" },
      { id: "P3", marks: "3" },
      { id: "P4", marks: "3" }
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
