const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./app/connection');

const app = express();
// app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./app/register'));
app.use(require('./app/endpoints/login'));
app.use(require('./app/endpoints/collections'));

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});
server.on('error', console.error);

export default app;