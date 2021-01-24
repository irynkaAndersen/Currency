import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import * as ReactReduxHooks from "react-redux";
import * as enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Loader from "../../components/Loader";
import Currencies from ".";

enzyme.configure({ adapter: new Adapter() });

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn().mockReturnValue({}),
}));

jest.mock("../../selectors/currencies.selector");
jest.useFakeTimers();

describe("Currencies", () => {
  const spy = jest.spyOn(ReactReduxHooks, "useSelector");

  it("should render with data", async () => {
    spy.mockReturnValue({
      prices: {
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
      status: "fulfilled",
      updated: "2021-01-23T20:42:13.306Z",
    });
    const wrapper = await shallow(<Currencies />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    const table = wrapper.find(".table_body tr");
    expect(table.length).toBe(2);

    expect(wrapper.find(".table_body td").length).toBe(10);
    expect(shallowToJson(wrapper.find(".currencies p")).children).toEqual([
      "Last updated: ",
      "2021-01-23T20:42:13.306Z",
    ]);

    wrapper.find(".table_head td button").at(0).simulate("click");
    expect(wrapper.find(".table_body td").at(0).text()).toBe("EUR");
    wrapper.find(".table_head td button").at(0).simulate("click");
    expect(wrapper.find(".table_body td").at(0).text()).toBe("GBP");
  });

  it("should render with loader", async () => {
    spy.mockReturnValue({
      prices: {},
      status: "pending",
      updated: "2021-01-23T20:42:13.306Z",
    });
    const wrapper = await shallow(<Currencies />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(<Loader />).toBeDefined();
  });

  it("should render with error", async () => {
    spy.mockReturnValue({
      prices: {},
      status: "rejected",
      updated: "2021-01-23T20:42:13.306Z",
    });
    const wrapper = await shallow(<Currencies />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(".error").length).toBe(1);
  });
});
