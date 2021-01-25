const parse = require("node-html-parser");

const request = require('request');

const parseResult = (body) => {
    const root = parse.parse(body);
    const tagsCounter = {};

    const traverse = (node) => {
        const children = node.childNodes

        const tags = [];

        if (!children.length && node.tagName !== undefined && node.tagName !== null) {
            if(tagsCounter[node.tagName]) tagsCounter[node.tagName] = tagsCounter[node.tagName] + 1;
            else tagsCounter[node.tagName] = 1;
            tags.push(node.tagName);
            return [node.tagName]
        }

        children.forEach((child) => {
            const newChildren = traverse(child);
            tags.push([...newChildren])
        })
        return tags.flat();
    }

    const allTags = traverse(root);

    const uniqTags = allTags.filter((value, index, self) => {
        return self.indexOf(value) === index
    })

    const findFrequentlyTag = (obj) => {
        const keys = Object.keys(obj);
        let frequentlyTagSize = 0;
        keys.forEach((item) => {
            if(obj[item] > frequentlyTagSize){
                frequentlyTagSize = obj[item];
            }
        });

        const frequentlyTags = [];

        keys.forEach((item) => {
            if(obj[item] === frequentlyTagSize){
                frequentlyTags.push(item)
            }
        });

        return frequentlyTags;
    }

    // mock data
    return {
        unique_tags: uniqTags,
        most_used_tag: findFrequentlyTag(tagsCounter),
        longest_path: "will be implemented in the future",
    };
};

const parsePage = async(url) => {
    return url
        ? await new Promise((resolve, reject) => {
            request(url, function (error, response, body) {
                return resolve(body);
            })
        }).then((data) => {return parseResult(data)})
        : null
};

parsePage("https://www.google.com/").then(data => console.log(data));
module.exports = parsePage;
