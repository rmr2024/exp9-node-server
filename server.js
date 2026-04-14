const http = require("http");
const os = require("os");
const path = require("path");
const events = require("events");

const emitter = new events.EventEmitter();

emitter.on("request", url => console.log(`Request received for ${url}`));

const server = http.createServer((req, res) => {
  emitter.emit("request", req.url);
  if (req.url === "/info") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      hostname: os.hostname(),
      platform: os.platform(),
      uptime: os.uptime(),
      currentDir: path.resolve("."),
    }, null, 2));
    return;
  }
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<h1>Custom HTTP Server</h1><p>Visit <a href="/info">/info</a> for system details.</p>`);
});

server.listen(3001, () => console.log("Node HTTP server running on http://localhost:3001"));
