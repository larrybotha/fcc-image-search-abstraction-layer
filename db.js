const {MongoClient} = require('mongodb');

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

// need to pass in both the url and dbName here... but other docs indicate
// that this behaviour is pre-3.x for mongodb-native-client...
const init = () => MongoClient.connect(`${url}/${dbName}`, (err, client) => {
  if (err) throw err;
  
  const db = client.db();
  
  module.exports.db = db;
})

module.exports.initDb = init;