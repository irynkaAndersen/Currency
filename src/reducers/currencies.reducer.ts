import { handleActions } from "redux-actions";
import { getBitcoinPricesAction } from "../actions/currencies.action";
import { ICurrencies } from "../store/interface";

const initialState: ICurrencies = {
  prices: {},
  status: "fulfilled",
  updated: new Date(),
};

const currenciesReducer = handleActions(
  {
    [`${getBitcoinPricesAction}`]: (state, { payload }) => {
      return { ...state, ...payload, updated: new Date() };
    },
  },
  initialState
);

export default currenciesReducer;
