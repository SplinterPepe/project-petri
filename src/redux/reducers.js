import { combineReducers } from "redux";
import {
  TOGGLE_EDIT_MENU,
  SUBMIT_STATE_TO_INITIAL,
  SUBMIT_STATE_TO_CURRENT,
  SUBMIT_STATE_TO_TEMPORARY,
  FIRE_TRANSITION
} from "./actions";

const initialState = (
  state = {
    nodes: [
      { id: "T1", nodeType: "transition" },
      { id: "P1", nodeType: "place", marks: 3 },
      { id: "P2", nodeType: "place", marks: 3 },
      { id: "P3", nodeType: "place", marks: 0 }
    ],
    links: [
      { source: "P1", target: "T1" },
      { source: "P2", target: "T1" },
      { source: "T1", target: "P3" }
    ]
  },
  action
) => {
  switch (action.type) {
    case SUBMIT_STATE_TO_INITIAL:
      return action.payload;
    default:
      return state;
  }
};
const currentState = (
  state = {
    nodes: [
      { id: "T1", nodeType: "transition" },
      { id: "P1", nodeType: "place", marks: 3 },
      { id: "P2", nodeType: "place", marks: 3 },
      { id: "P3", nodeType: "place", marks: 0 }
    ],
    links: [
      { source: "P1", target: "T1" },
      { source: "P2", target: "T1" },
      { source: "T1", target: "P3" }
    ]
  },
  action
) => {
  switch (action.type) {
    case SUBMIT_STATE_TO_CURRENT:
      return action.payload;
    case FIRE_TRANSITION:
      //если есть хотя бы одна позиция с недостатком меток - скип
      if (
        state.nodes.findIndex(
          node =>
            node.marks < 1 &&
            state.links.findIndex(
              link => link.source === node.id && link.target === "T1"
            ) !== -1
        ) !== -1
      )
        return state;
      //иначе перекидываем метки через переход
      else
        return {
          nodes: state.nodes.map((node, index) => {
            //ищем источники и вычитаем из них
            if (
              node.nodeType === "place" &&
              state.links.findIndex(
                item => item.target === "T1" && item.source === node.id
              ) !== -1
            )
              return {
                id: node.id,
                nodeType: node.nodeType,
                marks: node.marks - 1
              };
            //ищем таргеты и прибовляем к ним
            if (
              node.nodeType === "place" &&
              state.links.findIndex(
                item => item.target === node.id && item.source === "T1"
              ) !== -1
            )
              return {
                id: node.id,
                nodeType: node.nodeType,
                marks: node.marks + 1
              };
            return node;
          }),
          //всегда возвращаем все связи
          links: [...state.links]
        };
    default:
      return state;
  }
};

const temporaryState = (state = { nodes: [], links: [] }, action) => {
  switch (action.type) {
    case SUBMIT_STATE_TO_TEMPORARY:
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
  initialState,
  currentState,
  temporaryState,
  isEditMenuToggled
});
