var https = require('https');

https.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
}).listen(process.env.PORT || 8080, () => console.log('Server started'));

const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');
const url         = process.env.MONGODB_URI

const dbName = 'duty-bee';
const client = new MongoClient(url, { useNewUrlParser: true });

client.connect((err) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db         = client.db(dbName);
  const collection = db.collection('settings');

  client.close();
});

////////

const working_bees = ['André', 'Liliana', 'Miguel'];

var output = working_bees[Math.floor(Math.random() * working_bees.length)];

const payload = JSON.stringify({
  bee: output
});

const options = {
  headers: { 'Content-type' : 'application/json' },
  hostname: 'hooks.zapier.com',
  path: '/hooks/catch/4803493/7zu7uv',
  method: 'POST',
  body: JSON.parse(payload)
};

const request = https.request(options, (res) => {
  res.on('data', (data) => {
    if (res.statusCode !== 200) {
      throw new Error('Not OK (non-200 status code received)');
    }

    if (data) {
      data = JSON.parse(data);
      console.log('Response:', data);
    }
  });
})

request.on('error', (e) => {
  throw new Error(e.message);
});

request.write(payload);
request.end();
