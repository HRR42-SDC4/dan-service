const { Client } = require('pg');
const connectionString = "postgres://danxu:@localhost:5432/postgres";
const client = new Client({
    connectionString: connectionString
});

client.connect();

// const get = (id) => {
//   return new Promise ((resolve, reject) => {
//     client.query('SELECT recs, genre, name FROM recommendations where id = $1', [id])
//       .then((data) => {
//         const ids = data.rows[0].recs;
//         const genre = data.rows[0].genre;
//         const name = data.rows[0].name;
//         client.query(`SELECT name, price, description, pics FROM recommendations where id IN (${ids})`)
//           .then((data) => {
//             let recs = data.rows;
//             resolve({recs, genre, name});
//           })
//           .catch(err => console.log('GET ERROR:', err))
//       })
//       .catch(err => reject(err));
//   })
// };

// const insert = (record) => {
//   return new Promise((resolve, reject) => {
//     client.query('INSERT INTO recommendations Values ($1, $2, $3, $4, $5, $6, $7)', [record.id, record.genre, record.name, record.price, record.description, record.pics, record.recs])
//       .then(result => resolve(result))
//       .catch(err => reject(err));
//   })

// }

// const updateRecord = (id, record) => {
//   return  new Promise((resolve, reject) => {
//    client.query(`UPDATE recommendations SET ${Object.keys(record)[0]} = $1 WHERE id = $2`, [Object.values(record)[0], id])
//      .then(result => resolve(result))
//      .catch(err => reject(err))
//   })
// }

// const deleteRecord = (id) => {
//   return  new Promise((resolve, reject) => {
//     client.query('DELETE FROM recommendations WHERE id = $1', [id])
//       .then(result => resolve(result))
//       .catch(err => reject(err))
//   })
// }

// module.exports = {get, insert, updateRecord, deleteRecord};
module.exports = client;


