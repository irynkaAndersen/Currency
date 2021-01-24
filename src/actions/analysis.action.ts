import { createAction } from "redux-actions";
import { Dispatch } from "redux";

export const parseWebPageByURLAction = createAction("PARSE_WEB_PAGE");

export const parseWebPageByURL = (url: string) => async (
  dispatch: Dispatch
) => {
  dispatch(parseWebPageByURLAction({ data: {}, status: "pending" }));
  await fetch("http://localhost:8080/parser", {
    method: "post",
    body: JSON.stringify({ url }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => {
      dispatch(
        parseWebPageByURLAction({
          data: { ...data },
          status: "fulfilled",
        })
      );
    })
    .catch(() => {
      dispatch(parseWebPageByURLAction({ data: {}, status: "rejected" }));
    });
};

export default parseWebPageByURL;
