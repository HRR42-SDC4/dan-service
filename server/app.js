const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const https = require('https');
const cassandra = require('cassandra-driver');
const contactPoint = 'localhost';
const client = new cassandra.Client({ contactPoints: [contactPoint], localDataCenter: 'datacenter1', keyspace: 'zagat' });

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Cassandra connected');
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('client'));

app.get('/api/restaurants/:restaurantId', (req, res) => {
  var id = req.params.restaurantId;
  // console.log('id', id);
  const query1 = `SELECT recs, genre, name FROM recommendations where id = ${id}`;
  client.execute(query1)
  .then((data) => {
    const ids = data.rows[0].recs;
    const genre = data.rows[0].genre;
    const name = data.rows[0].name;
    const query2 = `SELECT name, price, description, pics FROM recommendations where id IN (${ids})`
    client.execute(query2)
      .then((data) => {
        let recs = data.rows;
        res.send({recs, genre, name});
      })
      .catch(err => res.status(500).end());
  })
  .catch(err => res.status(500).end());
});

app.post('/api/restaurants', (req, res) => {
  const record = req.body;
  const query1 = `INSERT INTO recommendations (id, genre, name, price, description, pics, recs) Values (${record.id}, '${record.genre}', '${record.name}', '${record.price}', '${record.description}', '${record.pics}', '${record.recs}')`;
  client.execute(query1)
    .then((result) => {
      res.status(201).end();
    })
    .catch((err) => {
      console.log('err', err);
      res.status(500).end();
    });
});

// app.put('/api/restaurants/:restaurantId', (req, res) => {
//   const record = req.body;
//   const id = req.params.restaurantId;
//   client.query(`UPDATE recommendations SET ${Object.keys(record)[0]} = $1 WHERE id = $2`, [Object.values(record)[0], id])
//   .then(res.status(201).end())
//   .catch(res.status(500).end())
// })

// app.delete('/api/restaurants/:restaurantId', (req, res) => {
//   const id = req.params.restaurantId;
//   client.query('DELETE FROM recommendations WHERE id = $1', [id])
//     .then(res.status(200).end())
//     .catch(res.status(500).end())
// })

const port = 3006;
app.listen(port, () => console.log(`listening on port ${port}`));