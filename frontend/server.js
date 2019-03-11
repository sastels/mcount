const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const fetch = require('node-fetch');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/data', (req, res) => {
  fetch("http://api-service:4000/data")
    .then(response => response.json())
    .then(data => { res.status(200).send(data) })
    .catch(error => {
      console.log("Error fetching data from api: ", error)
    })  
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));
