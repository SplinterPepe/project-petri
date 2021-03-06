export const getInitialState = (state) => state.initialState;
export const getCurrentState = (state) => state.currentState.graphData;
export const getStats = (state) => state.currentState.stats;
export const getTemporaryState = (state) => state.temporaryState;
export const getSequence = (state) => state.sequence;
export const getFocusedNode = (state) => state.focusedNode;
export const getIsFiring = (state) => state.isFiring;
export const getIsEditorToggled = (state) => state.appContent.editor;
export const getIsSimToggled = (state) => state.appContent.sim;
export const getIsStatsToggled = (state) => state.appContent.stats;
export const getIsNodeConfigToggled = (state) => state.appContent.nodeConfig;
