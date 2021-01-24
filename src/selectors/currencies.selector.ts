import { createSelector } from "reselect";
import { IStore, ICurrencies } from "../store/interface";

export const getBitcoinPricesSelector = createSelector(
  ({ currencies }: IStore): ICurrencies => currencies,
  (data) => data
);

export default getBitcoinPricesSelector;
