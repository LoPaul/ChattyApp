// server.js
const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  broadcastConnectionCount();
  initialClientConnection(ws);
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
      console.log('Client disconnected');
      broadcastConnectionCount();
    });
});

function initialClientConnection(client) {
  // send initial data to client for message history and default color
  client.send(JSON.stringify({type: "incomingAllMessages", content: messageHistory}));
  client.send(JSON.stringify({type: "incomingDefaultColor", content: colors[wss.clients.size]}));
}

function broadcastConnectionCount() {
  // broadcast to client current user count / connections
  var count = wss.clients.size;
  var message = { type: "IncomingUserNotifiation", userCount: count};
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN)  {
      client.send(JSON.stringify(message));
    }
  })
}

var colors = ["red", "gray", "green", "purple"];
var messageHistory = [];

const WebSocket = require('ws');

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to everyone messages send by client
    var outMessage = responseForIncomingMessage(JSON.parse(data));
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN)  { //&& client !== ws )
        client.send(JSON.stringify(outMessage));
      }
    });
  });
});

function responseForIncomingMessage(msg) {
  // compose response based on incoming message
  if(msg.type === "postMessage" || msg.type === "postNotification") {
    msg.id = generateRandomId();
    msg.type = "incomingMessage"
  }
  messageHistory.push(msg);
  return msg
}

// random ID generator
const generateRandomId = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter("", 10);
})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
