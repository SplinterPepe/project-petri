import React from "react";
import styled from "styled-components";
import { createDevTools } from "redux-devtools";
import LogMonitor from "redux-devtools-log-monitor";
import DockMonitor from "redux-devtools-dock-monitor";

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultIsVisible={true}
    defaultSize="0"
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);

export default DevTools;
