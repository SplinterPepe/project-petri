export const TOGGLE_EDIT_MENU = "TOGGLE_EDIT_MENU";
export const SUBMIT_STATE_TO_INITIAL = "SUBMIT_STATE_TO_INITIAL";
export const SUBMIT_STATE_TO_TEMPORARY = "SUBMIT_STATE_TO_TEMPORARY";
export const SUBMIT_STATE_TO_CURRENT = "SUBMIT_STATE_TO_CURRENT";
export const FIRE_TRANSITION = "FIRE_TRANSITION";

export function toggleEditMenu() {
  return { type: TOGGLE_EDIT_MENU };
}

export function submitStateToInitial({ nodes, links }) {
  return { type: SUBMIT_STATE_TO_INITIAL, payload: { nodes, links } };
}

export function submitStateToCurrent({ nodes, links }) {
  return { type: SUBMIT_STATE_TO_CURRENT, payload: { nodes, links } };
}

export function submitStateToTemporary({ nodes, links }) {
  return { type: SUBMIT_STATE_TO_TEMPORARY, payload: { nodes, links } };
}

export function fireTransition() {
  return { type: FIRE_TRANSITION };
}
