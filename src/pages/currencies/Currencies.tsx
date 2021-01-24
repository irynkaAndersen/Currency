import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getBitCoinPrices from "../../actions/currencies.action";
import { getBitcoinPricesSelector } from "../../selectors/currencies.selector";
import { styleNames } from "../../utils/styleNames";
import useSorting from "../../utils/useSorting";
import Loader from "../../components/Loader";
import styles from "./Currencies.scss";

const sn = styleNames(styles);

const Currencies: FC = () => {
  const dispatch = useDispatch();
  const { prices, status, updated } = useSelector(getBitcoinPricesSelector);
  const [sortBy, setSortBy] = useState<{
    key: string;
    direction?: "asc" | "desc";
  }>({ direction: undefined, key: "" });
  const data = useSorting(
    (prices as unknown) as { [x: string]: number | string }[],
    sortBy
  );

  const sortByKey = useCallback(
    (key: string, direction: "asc" | "desc") => () =>
      setSortBy({ key, direction }),
    [setSortBy]
  );

  const showBtn = useCallback(
    (key: string) => {
      let sort: "asc" | "desc" = "asc";
      if (sortBy.key === key) {
        if (sortBy.direction === "asc") sort = "desc";
      }
      return (
        <button
          onClick={sortByKey(key, sort)}
          type="button"
          className={sn("sort")}
        >
          {sort === "asc" ? "↑" : "↓"}
        </button>
      );
    },
    [sortBy]
  );

  const tableData = useMemo(() => {
    const currencies = Object.keys(data);
    return currencies.map((item: string) => {
      // @ts-ignore
      const childKeys = Object.keys(data[item]);
      return (
        <tr key={item}>
          {childKeys.map((tdData: string) => (
            // @ts-ignore
            <td key={tdData}>{data[item][tdData]}</td>
          ))}
        </tr>
      );
    });
  }, [data]);

  const tableHead = useMemo(() => {
    const rows: string[] = Object.keys(data);
    if (rows.length) {
      // @ts-ignore
      const cells = Object.keys(data[rows[0]]);
      return cells.map((item) => (
        <td key={item}>
          {item}
          {showBtn(item)}
        </td>
      ));
    }
    return null;
  }, [data, showBtn]);

  useEffect(() => {
    dispatch(getBitCoinPrices);
    const getDataInterval = setInterval(
      () => dispatch(getBitCoinPrices),
      60000
    );
    return () => clearInterval(getDataInterval);
  }, []);

  const content = useMemo(() => {
    switch (status) {
      case "rejected":
        return <div className={sn("error")}>Service is not responding</div>;
      case "fulfilled":
        return (
          <>
            <table className={sn("table")}>
              <thead className={sn("table_head")}>
                <tr>{tableHead}</tr>
              </thead>
              <tbody className={sn("table_body")}>{tableData}</tbody>
            </table>
            <p className={sn("time")}>Last updated: {updated.toString()}</p>
          </>
        );
      default:
        return <Loader />;
    }
  }, [status, tableData, tableHead, updated]);

  return (
    <div className="wrap">
      <h1>Currencies</h1>
      <div className={sn("currencies")}>{content}</div>
    </div>
  );
};

export default Currencies;
