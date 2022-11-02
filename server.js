const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(5001, () => {
  console.log('server listens to port 5001')
});
