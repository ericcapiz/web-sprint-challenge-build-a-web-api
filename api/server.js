const express = require('express');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

const actionRouter = require('./actions/actions-router');
const projectRouter = require('./projects/projects-router');

server.use(express.json());
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);


server.get('/', (req, res) => {
    res.send('UNIT 4-SPRINT 1');
  });

module.exports = server;
