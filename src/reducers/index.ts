import { combineReducers } from "redux";
import { IStore } from "../store/interface";
import currenciesReducer from "./currencies.reducer";
import analysisReducer from "./analysis.reducer";

const rootReducer = combineReducers<IStore>({
  currencies: currenciesReducer,
  analysis: analysisReducer,
});

export default rootReducer;
