export const TOGGLE_EDIT_MENU = "TOGGLE_EDIT_MENU";
export const SUBMIT_TEMPORARY_STATE = "SUBMIT_TEMPORARY_STATE";
export const SET_TEMPORARY_STATE_TO_CURRENT = "SET_TEMPORARY_STATE_TO_CURRENT";
export const FIRE_TRANSITION = "FIRE_TRANSITION";

export function toggleEditMenu() {
  return { type: TOGGLE_EDIT_MENU };
}

export function submitTemporaryState({ nodes, links }) {
  return { type: SUBMIT_TEMPORARY_STATE, payload: { nodes, links } };
}

export function setTemporaryStateToCurrent({ nodes, links }) {
  return { type: SET_TEMPORARY_STATE_TO_CURRENT, payload: { nodes, links } };
}

export function fireTransition(payload) {
  return { type: FIRE_TRANSITION };
}
