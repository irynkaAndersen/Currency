import { useCallback } from "react";

type SimpleObj = { [x: string]: number | string };

const useSorting = (
  data: SimpleObj[],
  sortBy: { key: string; direction?: "asc" | "desc" }
) => {
  const getItems = useCallback((item) => data[item], [data]);
  const keys = Object.keys(data);
  const dataArr = keys.map(getItems);

  if (sortBy.key) {
    const sortFn = (a: SimpleObj, b: SimpleObj) =>
      a[sortBy.key] > b[sortBy.key] ? 1 : -1;
    if (sortBy.direction === "desc") return dataArr.sort(sortFn).reverse();
    return dataArr.sort(sortFn);
  }
  return dataArr;
};

export default useSorting;
