const mongoose = require('mongoose');
const Recs = require('./recs.js');
mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/zagat', { useNewUrlParser: true, useUnifiedTopology: true });

const get = (id) => {
  return Recs.find({id})
    .exec();
};

const insert = (record) => {
  let rec = new Recs(record);
  return rec.save();
}

const updateRecord = (id, record) => {
  return  new Promise((resolve, reject) => {
    Recs.update({id}, record, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

const deleteRecord = (id) => {
  return Recs.find({id})
    .remove()
    .exec();
}



module.exports = { db, get, insert, updateRecord, deleteRecord};