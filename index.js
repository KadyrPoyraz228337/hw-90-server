const express = require('express');
const cors = require('cors');
const {nanoid} = require('nanoid');
const expressWs = require('express-ws');

const app = express();
const port = 8000;

expressWs(app);

app.use(express.json());
app.use(cors());

const connections = {};

app.ws('/paint', (ws, req) => {
  const id = nanoid();

  connections[id] = ws;

  ws.on('message', msg => {
    Object.keys(connections).forEach(id => {
      connections[id].send(msg);
    })
  });

  ws.on('close', msg => {
    delete connections[id]
  })
});

app.listen(port, () => {
  console.log(`Ws server start on ${port} port!`)
});