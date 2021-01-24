const parse = require("node-html-parser");

const request = require("request");

const parsePage = (body) => {
  const root = parse.parse(body);
  // mock data
  return {
    unique_tags: ["div", "a", "p"],
    most_used_tag: "div",
    longest_path: "div,div,div,div",
  };
};

const getPage = (url) => {
  const result = url
    ? request(url, function (error, response, body) {
        return body;
      })
    : null;
  return parsePage(result);
};

// getPage("https://razdvasushi.by/");

module.exports = getPage;
