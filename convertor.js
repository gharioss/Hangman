//to run this file, command line is : "node ./convertor.js";

const fs = require("fs");

fs.readFile("pli07.txt", "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }

  const content = data.split("\n");
  const result = JSON.stringify({ words: content });

  console.log(content.length);

  fs.writeFileSync("words.json", result);
});
