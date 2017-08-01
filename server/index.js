const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

const app = express();
let db // mongo
const url = require('./env/config');
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../client/output/')));
app.use(express.static(path.join(__dirname, '../client/static/')))

console.log(path.join(__dirname, '../client/output'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
 
app.get('/', (req, res) => {
  res.status(200).send('Hello World');
})

MongoClient.connect(url, (err, database) => {
  assert.equal(null, err);
  db = database;
  console.log('Connected Database and Server');
  app.listen(PORT, err => {
    assert.equal(null, err);
    console.log('listening on port...', PORT);
  })
})




