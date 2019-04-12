const http = require('http');
const scheduler = require('node-schedule');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
}).listen(process.env.PORT || 8080, () => console.log('Server started'));

scheduler.scheduleJob('5 * * * * *', (timestamp) => {
  console.log(`ping at ${timestamp}`);
});

const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');
const url         = 'mongodb://localhost:27017';

const dbName = 'duty-bee';
const client = new MongoClient(url, { useNewUrlParser: true });

client.connect((err) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db         = client.db(dbName);
  const collection = db.collection('settings');

  client.close();
});
