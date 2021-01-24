import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import * as actions from "./currencies.action";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const returnValue = {
  bpi: {
    EUR: {
      code: "EUR",
      symbol: "&euro;",
      rate: "26,389.9814",
      description: "Euro",
      rate_float: 26389.9814,
    },
    GBP: {
      code: "GBP",
      symbol: "&pound;",
      rate: "23,439.7820",
      description: "British Pound Sterling",
      rate_float: 23439.782,
    },
  },
};

describe("actions", () => {
  it("getBitcoinPricesAction", () => {
    const text = "Finish docs";
    const expectedAction = {
      type: "GET_BITCOIN_PRICES",
      payload: text,
    };
    expect(actions.getBitcoinPricesAction(text)).toEqual(expectedAction);
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("get Bitcoin prices successful", () => {
    fetchMock.getOnce("https://api.coindesk.com/v1/bpi/currentprice.json", {
      body: returnValue,
    });

    const store = mockStore({
      currencies: { prices: {}, status: "fulfilled", updated: new Date() },
    });

    // @ts-ignore
    return store.dispatch(actions.getBitcoinPrices).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual([
        {
          type: "GET_BITCOIN_PRICES",
          payload: { prices: {}, status: "pending" },
        },
        {
          type: "GET_BITCOIN_PRICES",
          payload: {
            prices: returnValue.bpi,
            status: "fulfilled",
          },
        },
      ]);
    });
  });

  it("get Bitcoin prices rejected", () => {
    fetchMock.getOnce("https://api.coindesk.com/v1/bpi/currentprice.json", {
      status: "rejected",
    });
    const store = mockStore({
      currencies: { prices: {}, status: "fulfilled", updated: new Date() },
    });

    // @ts-ignore
    return store.dispatch(actions.getBitcoinPrices).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual([
        {
          type: "GET_BITCOIN_PRICES",
          payload: { prices: {}, status: "pending" },
        },
        {
          type: "GET_BITCOIN_PRICES",
          payload: {
            prices: {},
            status: "rejected",
          },
        },
      ]);
    });
  });
});
