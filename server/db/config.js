const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

var url = require('../env/config');

MongoClient.connect(url, (err, db) => {
  assert.equal(null, err);

  console.log('1: testing seating. Inserting documents')
  insertDocuments(db, () => {
    console.log('2: finding documents')
    findDocuments(db, () => {
      console.log('3: updating documents')
      updateDocument(db, () => {
        console.log('4: removing a document')
        removeDocument(db, () => {
          console.log('5: CRUD operations successful. Removing tests')
          removeDocuments(db, () => {
            console.log("6: Connected Database to Server")
            db.close();
          })
        })
      })
    })
  })
});

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({'a': 3}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });      
}

var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });  
}

var removeDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Delete document where a is 3
  collection.deleteOne({ a : 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });    
}

var removeDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Delete document where a is 3
  collection.deleteMany({}, function(err, result) {
    assert.equal(err, null);
    assert.equal(2, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });    
}const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

var url = require('../env/config');

MongoClient.connect(url, (err, db) => {
  assert.equal(null, err);

  console.log('1: testing seating. Inserting documents')
  insertDocuments(db, () => {
    console.log('2: finding documents')
    findDocuments(db, () => {
      console.log('3: updating documents')
      updateDocument(db, () => {
        console.log('4: removing a document')
        removeDocument(db, () => {
          console.log('5: CRUD operations successful. Removing tests')
          removeDocuments(db, () => {
            console.log("6: Connected Database to Server")
            db.close();
          })
        })
      })
    })
  })
});

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({'a': 3}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });      
}

var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });  
}

var removeDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Delete document where a is 3
  collection.deleteOne({ a : 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });    
}

var removeDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Delete document where a is 3
  collection.deleteMany({}, function(err, result) {
    assert.equal(err, null);
    assert.equal(2, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });    
}