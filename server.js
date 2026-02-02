const express = require('express')
const WebSocket = require('ws');
const {WebSocketServer}  = require('ws');
const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

let userCount = 0;

wss.on('connection', (ws) => {
  ws.on('error', console.error);
  console.log("connected",ws)

  ws.on('message', (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  console.log("userCount ", ++userCount)
  ws.send('Hello! Message From Server!!');
});