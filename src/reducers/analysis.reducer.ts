import { handleActions } from "redux-actions";
import { parseWebPageByURLAction } from "../actions/analysis.action";
import { IAnalysis } from "../store/interface";

const initialState: IAnalysis = {
  data: {},
  status: "fulfilled",
};

const analysisReducer = handleActions(
  {
    [`${parseWebPageByURLAction}`]: (state, { payload }) => {
      return { ...state, ...payload, updated: new Date() };
    },
  },
  initialState
);

export default analysisReducer;
