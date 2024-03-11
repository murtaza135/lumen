import { History, history as masterHistory } from './router/history';
import { StateManager, stateManager as masterStateManager } from "./state/StateManager";
import "./router/Link";
import "./router/Navigate";

export { BaseComponent } from "./dom/BaseComponent";
export { converter } from "./dom/converter";
export { createComponents } from "./dom/createComponents";
export { html, htmlUnsafe } from "./dom/html";
export { render } from "./dom/render";

type SimpleHistory = Omit<History, "setParams">;
export const history = masterHistory as SimpleHistory;
export { createRouter } from "./router/Router";
// export { type Route } from "./router/router.types";

type SimpleStateManager = Pick<StateManager, "createSlices">;
export const stateManager = masterStateManager as SimpleStateManager;
export { StateSlice } from "./state/StateSlice";
// export { createMutationObject, type MutationObject } from "./state/createMutationObject";
// export { createQueryObject, type QueryObject } from "./state/createQueryObject";
// export { type Status, type StateValue, type StateSubscriber, type QueryStateValue, type MutationStateValue, type QueryFunction, type MutationFunction, type Transformer } from "./state/state.types";
