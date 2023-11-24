const { error } = require("console");
const http = require("http");
const url = require("url");
const server = http.createServer();
server.on("request", (request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  const q = url.parse(request.url, true);
  console.log(q);
  response.end(handleUserAction(q.pathname));
});
handleUserAction = (urlStr) => {
  const clientUrl = urlStr.split("/");
  let returnString = null;
  if (clientUrl[1] === "gameboard") {
    returnString = "gameboard";
  } else if (clientUrl[1] === "move") {
    returnString = "move";
  } else {
    returnString = "??";
  }
  return returnString;
};
server.on("request", (request, response) => {
  const { method, url } = request;
  console.log("logging " + method + " url " + url);
});
server.on("request", () => {
  console.error(error.stack);
});
server.listen(3000, "0.0.0.0", () =>
  console.log("server running at http://0.0.0.0:3000")
);
connect4 = (x) => {
  if (x % 2 === 0) {
    return "even";
  } else {
    return "odd";
  }
};
