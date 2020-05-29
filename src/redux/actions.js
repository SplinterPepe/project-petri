export const SUBMIT_STATE_TO_INITIAL = "SUBMIT_STATE_TO_INITIAL";
export const SUBMIT_STATE_TO_TEMPORARY = "SUBMIT_STATE_TO_TEMPORARY";
export const SUBMIT_STATE_TO_CURRENT = "SUBMIT_STATE_TO_CURRENT";
export const SUBMIT_STATE_TO_SEQUENCE = "SUBMIT_STATE_TO_SEQUENCE";
export const FIRE_TRANSITION_ON_SEQUENCE = "FIRE_TRANSITION_ON_SEQUENCE";
export const TOGGLE_IS_FIRING = "TOGGLE_IS_FIRING";
export const TOGGLE_EDIT_MENU = "TOGGLE_EDIT_MENU";
export const ADD_TRANSITION = "ADD_TRANSITION";
export const ADD_POSITION = "ADD_POSITION";
export const ADD_LINK = "ADD_LINK";

export function submitStateToInitial({ netType, nodes, links }) {
  return { type: SUBMIT_STATE_TO_INITIAL, payload: { netType, nodes, links } };
}

export function submitStateToCurrent({ netType, nodes, links }) {
  return { type: SUBMIT_STATE_TO_CURRENT, payload: { netType, nodes, links } };
}

export function submitStateToTemporary({ netType, nodes, links }) {
  return {
    type: SUBMIT_STATE_TO_TEMPORARY,
    payload: { netType, nodes, links },
  };
}

export function submitStateToSequence({ nodes, links }) {
  return { type: SUBMIT_STATE_TO_SEQUENCE, payload: { nodes, links } };
}

export function fireTransitionOnSequence({ next, transitions }) {
  return { type: FIRE_TRANSITION_ON_SEQUENCE, payload: { next, transitions } };
}

export function toggleEditMenu() {
  return { type: TOGGLE_EDIT_MENU };
}

export function toggleIsFiring() {
  return { type: TOGGLE_IS_FIRING };
}

export function addTransition() {
  return { type: ADD_TRANSITION };
}

export function addPosition() {
  return { type: ADD_POSITION };
}

export function addLink() {
  return { type: ADD_LINK };
}
