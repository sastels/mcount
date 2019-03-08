const express = require('express')
const cors = require('cors')

const ministers = require("./ministers.json");

const server = express()

server.use(cors())

server.get("/ping", (req, res) => {
  res.status(200)
  .send("pong")
})

server.get("/data", (req, res) => {
  console.log(Date(), "data requested")
  res.status(200)
  .send(JSON.stringify(ministers))
})

server.listen(4000, () => {
  console.log('now listening for requests on port 4000')
})
