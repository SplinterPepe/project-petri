import { combineReducers } from "redux";
import {
  SUBMIT_STATE_TO_INITIAL,
  SUBMIT_STATE_TO_CURRENT,
  SUBMIT_STATE_TO_TEMPORARY,
  SUBMIT_STATE_TO_SEQUENCE,
  FIRE_TRANSITION_ON_SEQUENCE,
  TOGGLE_IS_FIRING,
  TOGGLE_EDIT_MENU,
  ADD_TRANSITION,
  ADD_POSITION,
  ADD_LINK,
} from "./actions";

const init = {
  nodes: [
    { id: "T1", nodeType: "transition" },
    { id: "P1", nodeType: "place", marks: 1 },
    { id: "P2", nodeType: "place", marks: 0 },
    { id: "T2", nodeType: "transition" },
    { id: "P3", nodeType: "place", marks: 0 },
    { id: "T3", nodeType: "transition" },
    { id: "P4", nodeType: "place", marks: 1 },
    { id: "P5", nodeType: "place", marks: 0 },
  ],
  links: [
    { source: "P1", target: "T1" },
    { source: "T1", target: "P1" },
    { source: "T1", target: "P2" },
    { source: "P2", target: "T2" },
    { source: "T2", target: "P3" },
    { source: "P3", target: "T3" },
    { source: "T3", target: "P4" },
    { source: "P4", target: "T3" },
    { source: "T3", target: "P5" },
  ],
};
const initialState = (state = init, action) => {
  switch (action.type) {
    case SUBMIT_STATE_TO_INITIAL:
      return action.payload;
    default:
      return state;
  }
};

const currentState = (
  state = {
    stats: { steps: 0, transitionsFired: 0, transitionsFirednt: 0 },
    graphData: init,
  },
  action
) => {
  switch (action.type) {
    case SUBMIT_STATE_TO_CURRENT:
      return {
        stats: {
          steps: 0,
          transitionsFired: 0,
          transitionsFirednt: 0,
          transitions: action.payload.nodes.filter(
            (node) => node.nodeType === "transition"
          ),
        },
        graphData: action.payload,
      };
    case FIRE_TRANSITION_ON_SEQUENCE:
      //если есть хотя бы одна позиция с недостатком меток - скип
      if (
        state.graphData.nodes.findIndex(
          (node) =>
            node.marks < 1 &&
            state.graphData.links.findIndex(
              (link) =>
                link.source === node.id &&
                link.target ===
                  action.payload.transitions[action.payload.next].id
            ) !== -1
        ) !== -1
      )
        return {
          stats: {
            steps: state.stats.steps + 1,
            transitionsFired: state.stats.transitionsFired,
            transitionsFirednt: state.stats.transitionsFirednt + 1,
          },
          graphData: state.graphData,
        };
      //иначе перекидываем метки через переход
      else
        return {
          stats: {
            steps: state.stats.steps + 1,
            transitionsFired: state.stats.transitionsFired + 1,
            transitionsFirednt: state.stats.transitionsFirednt,
          },
          graphData: {
            nodes: state.graphData.nodes.map((node, index) => {
              if (node.nodeType === "place") {
                let Marks = node.marks;
                if (
                  state.graphData.links.findIndex(
                    (link) =>
                      link.target ===
                        action.payload.transitions[action.payload.next].id &&
                      link.source === node.id
                  ) !== -1
                ) {
                  Marks = Marks - 1;
                }
                if (
                  state.graphData.links.findIndex(
                    (link) =>
                      link.target === node.id &&
                      link.source ===
                        action.payload.transitions[action.payload.next].id
                  ) !== -1
                ) {
                  Marks = Marks + 1;
                }
                return {
                  id: node.id,
                  nodeType: node.nodeType,
                  marks: Marks,
                };
              }
              return node;
            }),
            //всегда возвращаем все связи
            links: [...state.graphData.links],
          },
        };
    default:
      return state;
  }
};

const temporaryState = (state = { nodes: [], links: [] }, action) => {
  switch (action.type) {
    case SUBMIT_STATE_TO_TEMPORARY:
      return action.payload;
    case ADD_TRANSITION:
      return {
        nodes: [...state.nodes, { id: ``, nodeType: "transition" }],
        links: [...state.links],
      };
    case ADD_POSITION:
      return {
        nodes: [...state.nodes, { id: ``, nodeType: "place", marks: 0 }],
        links: [...state.links],
      };
    case ADD_LINK:
      return {
        nodes: [...state.nodes],
        links: [...state.links, { source: "", target: "" }],
      };
    default:
      return state;
  }
};

const sequence = (
  state = {
    next: 0,
    transitions: [
      { id: "T1", nodeType: "transition" },
      { id: "T2", nodeType: "transition" },
      { id: "T3", nodeType: "transition" },
    ],
  },
  action
) => {
  switch (action.type) {
    case SUBMIT_STATE_TO_SEQUENCE:
      return {
        next: 0,
        transitions: action.payload.nodes.filter(
          (node) => node.nodeType === "transition"
        ),
      };
    case FIRE_TRANSITION_ON_SEQUENCE:
      if (state.next + 1 === state.transitions.length)
        return {
          next: 0,
          transitions: state.transitions,
        };
      else
        return {
          next: state.next + 1,
          transitions: state.transitions,
        };
    default:
      return state;
  }
};

const isFiring = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_IS_FIRING:
      return !state;
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
  sequence,
  isFiring,
  isEditMenuToggled,
});
