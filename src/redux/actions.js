export const TOGGLE_EDIT_MENU = "TOGGLE_EDIT_MENU";
export const SUBMIT_TEMPORARY_STATE = "SUBMIT_TEMPORARY_STATE";
export const SET_TEMPORARY_STATE_TO_CURRENT = "SET_TEMPORARY_STATE_TO_CURRENT";
export const FIRE_TRANSITION = "FIRE_TRANSITION";

export function toggleEditMenu() {
  return { type: TOGGLE_EDIT_MENU };
}

export function submitTemporaryState(payload) {
  return { type: SUBMIT_TEMPORARY_STATE, payload };
}

export function setTemporaryStateToCurrent(payload) {
  return { type: SET_TEMPORARY_STATE_TO_CURRENT, payload };
}

export function fireTransition(payload) {
  return { type: FIRE_TRANSITION, payload };
}
