import { createAction } from "redux-actions";
import { Dispatch } from "redux";

export const getBitcoinPricesAction = createAction("GET_BITCOIN_PRICES");

export const getBitcoinPrices = async (dispatch: Dispatch) => {
  dispatch(getBitcoinPricesAction({ prices: {}, status: "pending" }));
  await fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((data) => data.json())
    .then((data) => {
      dispatch(
        getBitcoinPricesAction({
          prices: { ...data.bpi },
          status: "fulfilled",
        })
      );
    })
    .catch(() => {
      dispatch(getBitcoinPricesAction({ prices: {}, status: "rejected" }));
    });
};

export default getBitcoinPrices;
