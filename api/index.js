const server = require("./server");
const port = 3000 || process.env.port;

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
