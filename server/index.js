const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const sass = require("node-sass");
const sassMiddleware = require("node-sass-middleware");

const app = express();
let db; // mongo
const url = require("./env/config");
const PORT = 3000;
const sassSrc = path.join(__dirname, "../client/sass");
const sassDest = path.join(__dirname, "../client");

app.use(
  sassMiddleware({
    src: sassSrc,
    dest: sassDest,
    debug: true,
    outputStyle: "expanded"
  })
);
app.use(express.static(path.join(__dirname, "../client/")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/todonts", (req, res) => {
  db
    .collection("todonts")
    .find({})
    .toArray((err, docs) => {
      if (err) {
        return console.alert(`could not GET todonts from the database`);
      }
      res.send(docs);
    });
});

app.post("/save", (req, res) => {
  console.log("this is the request object from axios", req.body);
  db
    .collection("todonts")
    .insertOne({ text: req.body.text, gotTime: req.body.gotTime });
  res.send("received");
});

app.delete("/delete", (req, res) => {
  console.log("a request to delete has been received from axios");
  console.log(req.body);
  db
    .collection("todonts")
    .deleteOne({ text: req.body.text, gotTime: req.body.gotTime })
    .then(() => {
      db
        .collection("todonts")
        .find({})
        .toArray((err, docs) => {
          assert.equal(err, null);
          console.log("deleted todont");
          res.send(docs);
        });
    })
    .catch(err => console.log(`could not delete from database`));
});

MongoClient.connect(url, (err, database) => {
  assert.equal(null, err);
  db = database;
  console.log("Connected Database and Server");
  const todonts = db.collection("todonts");

  todonts
    .insertMany([
      { text: "Use Shitty APIs", gotTime: true },
      {
        text: "Use APIs that look promising but are actually shit",
        gotTime: true
      },
      { text: "Use chessboardjs API", gotTime: true },
      { text: "Panic", gotTime: true }
    ])
    .then(() => {
      todonts.removeMany({});
    })
    .then(() => {
      todonts.insertMany([
        { text: "Use Shitty APIs", gotTime: true },
        {
          text: "Use APIs that look promising but are actually shit",
          gotTime: true
        },
        { text: "Use chessboardjs API", gotTime: true },
        { text: "Panic", gotTime: true }
      ]);
    })
    .then(() => {
      todonts.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Docs in database`);
        console.log(docs);
      });
    })
    .catch(err => console.alert("could not seat data in database: ", err));
  app.listen(PORT, err => {
    assert.equal(null, err);
    console.log("listening on port...", PORT);
  });
});
