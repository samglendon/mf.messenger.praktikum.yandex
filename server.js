const express = require('express');
const path = require('path');

const { banner, apiLimiter } = require('./server/middlewares/rate-limiter');

const { DEV_PORT } = require('./dev-config');
const { PORT = DEV_PORT } = process.env;

const app = express();


app.use(require('./server/middlewares/helmetMiddleware'));

app.use(express.static(path.join(__dirname, 'build')));

app.use('/v1/', banner, apiLimiter, (req, res, next) => {
  res.status(200)
    .send({ data: 'Привет!!!' });
});

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT} port`);
});
