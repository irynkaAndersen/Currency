import { createSelector } from "reselect";
import { IStore, IAnalysis } from "../store/interface";

export const getAnalysisResultSelector = createSelector(
  ({ analysis }: IStore): IAnalysis => analysis,
  (data) => data
);

export default getAnalysisResultSelector;
