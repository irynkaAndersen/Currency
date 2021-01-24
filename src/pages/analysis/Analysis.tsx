import React, { FC, useCallback, useState, ChangeEvent, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseWebPageByURL } from "../../actions/analysis.action";
import { getAnalysisResultSelector } from "../../selectors/analysis.selector";
import Loader from "../../components/Loader";

const Analysis: FC = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector(getAnalysisResultSelector);
  const [url, setUrl] = useState<string>("");
  const handleUrl = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setUrl(value),
    []
  );

  const onSubmit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(parseWebPageByURL(url));
    },
    [url]
  );

  const result = useMemo(() => {
    switch (status) {
      case "rejected":
        return <div>Service is not responding</div>;
      case "fulfilled":
        return (
          <ul>
            <li>Unique tags: {data.unique_tags?.toString()}</li>
            <li>Most used tag: {data.most_used_tag}</li>
            <li>Longest path: {data.longest_path}</li>
          </ul>
        );
      default:
        return <Loader />;
    }
  }, [status, data]);

  return (
    <div className="wrap">
      <h1>Analysis</h1>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={handleUrl} value={url} />
        <button type="submit">Parse page</button>
      </form>
      <div>{result}</div>
    </div>
  );
};

export default Analysis;
