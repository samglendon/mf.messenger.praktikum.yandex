const express = require('express');
const path = require('path');

const {DEV_PORT} = require('./dev-config');
const {PORT = DEV_PORT} = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => { console.log(`Server is listening ${PORT} port`)});
