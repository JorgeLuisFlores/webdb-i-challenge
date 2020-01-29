const express = require('express');
const server = express();
const accountRouter = require("./accounts/accountRouter.js");

server.use(express.json());

server.use('/accounts', accountRouter);

server.get("/", (req, res) => {
    res.send(`<h2>Welcome to this API!</h2>`);
});

module.exports = server;