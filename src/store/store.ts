import { createStore, applyMiddleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { IStore } from "./interface";
import rootReducer from "../reducers";

export function configureStore(): Store<IStore> {
  const middleware = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, middleware) as Store<IStore>;
}

export const store = configureStore();
