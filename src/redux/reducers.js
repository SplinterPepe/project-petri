import { combineReducers } from "redux";
import {
  SUBMIT_STATE_TO_INITIAL,
  SUBMIT_STATE_TO_CURRENT,
  SUBMIT_STATE_TO_TEMPORARY,
  SUBMIT_STATE_TO_SEQUENCE,
  FIRE_TRANSITION_ON_SEQUENCE,
  TOGGLE_IS_FIRING,
  TOGGLE_EDITOR,
  TOGGLE_SIM,
  TOGGLE_STATS,
  SELECT_NODE,
  ADD_TRANSITION,
  ADD_POSITION,
  ADD_LINK,
  CREATE_NEW_NET,
} from "./actions";

const init = {
  netType: {
    timed: true,
  },
  nodes: [
    { id: "T1", nodeType: "transition", delay: 5 },
    { id: "P1", nodeType: "place", marks: 1 },
    { id: "P2", nodeType: "place", marks: 0 },
    { id: "T2", nodeType: "transition", delay: 1 },
    { id: "P3", nodeType: "place", marks: 0 },
    { id: "P4", nodeType: "place", marks: 1 },
    { id: "T3", nodeType: "transition", delay: 3 },
    { id: "P5", nodeType: "place", marks: 1 },
    { id: "P6", nodeType: "place", marks: 0 },
    { id: "T4", nodeType: "transition", delay: 2 },
    { id: "P7", nodeType: "place", marks: 0 },
    { id: "P8", nodeType: "place", marks: 1 },
    { id: "P9", nodeType: "place", marks: 0 },
    { id: "T5", nodeType: "transition", delay: 10 },
    { id: "T6", nodeType: "transition", delay: 4 },
    { id: "P10", nodeType: "place", marks: 1 },
    { id: "P11", nodeType: "place", marks: 0 },
    { id: "T7", nodeType: "transition", delay: 2 },
    { id: "P12", nodeType: "place", marks: 0 },
    { id: "P13", nodeType: "place", marks: 0 },
  ],
  links: [
    { source: "P1", target: "T1" },
    { source: "T1", target: "P1" },
    { source: "T1", target: "P2" },
    { source: "P2", target: "T2" },
    { source: "T2", target: "P3" },
    { source: "T2", target: "P4" },
    { source: "P4", target: "T2" },
    { source: "P5", target: "T2" },
    { source: "T3", target: "P5" },
    { source: "T3", target: "P5" },
    { source: "P6", target: "T3" },
    { source: "T4", target: "P6" },
    { source: "T4", target: "P4" },
    { source: "P8", target: "T4" },
    { source: "T2", target: "P9" },
    { source: "P9", target: "T5" },
    { source: "T5", target: "P8" },
    { source: "P3", target: "T6" },
    { source: "T6", target: "P10" },
    { source: "P10", target: "T6" },
    { source: "T3", target: "P11" },
    { source: "P11", target: "T7" },
    { source: "T7", target: "P12" },
    { source: "T7", target: "P13" },
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
    netType: init.netType,
    stats: { steps: 0, transitionsFired: 0, transitionsFirednt: 0 },
    graphData: { nodes: init.nodes, links: init.links },
  },
  action
) => {
  switch (action.type) {
    case SUBMIT_STATE_TO_CURRENT:
      return {
        netType: state.netType,
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
      //Переход активен?
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
        ) !== -1 ||
        //Временная сеть
        (state.netType.timed === true &&
          state.graphData.nodes.findIndex(
            (node) =>
              node.id === action.payload.transitions[action.payload.next].id &&
              node.sleepFor > 0
          ) !== -1)
      )
        //Переход не активен
        return {
          //Обновляем статистику
          netType: state.netType,
          stats: {
            steps: state.stats.steps + 1,
            transitionsFired: state.stats.transitionsFired,
            transitionsFirednt: state.stats.transitionsFirednt + 1,
          },
          graphData: {
            nodes: state.graphData.nodes.map((node, index) => {
              if (node.nodeType === "transition" && node.sleepFor > 0)
                return {
                  id: node.id,
                  nodeType: node.nodeType,
                  delay: node.delay,
                  sleepFor: node.sleepFor - 1,
                };
              return node;
            }),
            links: [...state.graphData.links],
          },
        };
      //Переход активен
      else
        return {
          //Обновляем статистику
          netType: state.netType,
          stats: {
            steps: state.stats.steps + 1,
            transitionsFired: state.stats.transitionsFired + 1,
            transitionsFirednt: state.stats.transitionsFirednt,
          },
          graphData: {
            nodes: state.graphData.nodes.map((node, index) => {
              switch (node.nodeType) {
                case "transition": {
                  if (
                    node.id ===
                    action.payload.transitions[action.payload.next].id
                  )
                    return {
                      id: node.id,
                      nodeType: node.nodeType,
                      delay: node.delay,
                      sleepFor: node.delay,
                    };
                  // если у позиция спит то уменьшаем сон
                  if (node.sleepFor > 0) {
                    return {
                      id: node.id,
                      nodeType: node.nodeType,
                      delay: node.delay,
                      sleepFor: node.sleepFor - 1,
                    };
                  }
                  return node;
                }
                case "place": {
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
                default:
                  return node;
              }
            }),
            //всегда возвращаем все связи
            links: [...state.graphData.links],
          },
        };
    default:
      return state;
  }
};

const temporaryState = (
  state = { netType: { timed: false }, nodes: [], links: [] },
  action
) => {
  switch (action.type) {
    case SUBMIT_STATE_TO_TEMPORARY:
      return action.payload;
    case ADD_TRANSITION:
      return {
        netType: state.netType,
        nodes: [...state.nodes, { id: ``, nodeType: "transition" }],
        links: [...state.links],
      };
    case ADD_POSITION:
      return {
        netType: state.netType,
        nodes: [...state.nodes, { id: ``, nodeType: "place", marks: 0 }],
        links: [...state.links],
      };
    case ADD_LINK:
      return {
        netType: state.netType,
        nodes: [...state.nodes],
        links: [...state.links, { source: "", target: "" }],
      };
    case CREATE_NEW_NET:
      return {
        netType: {
          timed: false,
        },
        nodes: [{ id: "P1", nodeType: "place", marks: 0 }],
        links: [],
      };
    default:
      return state;
  }
};

const focusedNode = (state = "", action) => {
  switch (action.type) {
    case SELECT_NODE:
      return action.payload;
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
      // { id: "T3", nodeType: "transition" },
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

const appContent = (
  state = { editor: false, sim: true, stats: true },
  action
) => {
  switch (action.type) {
    case TOGGLE_EDITOR:
      return {
        editor: !state.editor,
        sim: state.sim,
        stats: state.stats,
        nodeConfig: state.nodeConfig,
      };
    case TOGGLE_SIM:
      return {
        editor: state.editor,
        sim: !state.sim,
        stats: state.stats,
        nodeConfig: state.nodeConfig,
      };
    case TOGGLE_STATS:
      return {
        editor: state.editor,
        sim: state.sim,
        stats: !state.stats,
        nodeConfig: state.nodeConfig,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  initialState,
  currentState,
  temporaryState,
  sequence,
  focusedNode,
  isFiring,
  appContent,
});
