requrie('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const https = require('https');
const db = require('./db/index.js');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('client'));

app.get('/api/restaurants/:restaurantId', (req, res) => {
  var id = req.params.restaurantId;
  db.get(id)
    .then(data => {
      res.send(data)
    })
    .catch(err => console.log('GET Error:', err));
});

app.post('/api/restaurants', (req, res) => {
  const record = req.body;
  db.insert(record)
    .then(res.status(201).end())
    .catch(err => console.log('POST Error:', err));
});

app.put('/api/restaurants/:restaurantId', (req, res) => {
  const record = req.body;
  const id = req.params.restaurantId;
  db.updateRecord(id, record)
    .then(res.status(201).end())
    .catch(err => console.log('PUT Error:', err));
})

app.delete('/api/restaurants/:restaurantId', (req, res) => {
  const id = req.params.restaurantId;
  db.deleteRecord(id)
    .then(res.status(201).end())
    .catch(err => console.log('DELETE Error:', err));
})

const port = 3005;
app.listen(port, () => console.log(`listening on port ${port}`));