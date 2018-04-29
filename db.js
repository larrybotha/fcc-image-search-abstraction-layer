const {MongoClient} = require('mongodb');

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

// need to pass in both the url and dbName here... but other docs indicate
// that this behaviour is pre-3.x for mongodb-native-client...
const initDb = cb => MongoClient.connect(`${url}/${dbName}`, (err, client) => {
  if (err) throw err;
  
  const db = client.db();
  
  if (cb) cb();
  
  module.exports.db = db;
})

module.exports.initDb = initDb;