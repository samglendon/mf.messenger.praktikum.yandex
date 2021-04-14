const express = require('express');
const path = require('path');
// const helmet = require('helmet');
const { banner, apiLimiter } = require('./server/middlewares/rate-limiter');

const { DEV_PORT } = require('./dev-config');

const { PORT = DEV_PORT } = process.env;

const app = express();

// app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//       'script-src': ["'self'", "'unsafe-eval'", 'https://ya-praktikum.tech'],
//     },
//   }),
// );

app.use(require('./server/middlewares/helmetMiddleware'));

app.use(express.static(path.join(__dirname, 'build')));

app.use('/v1/', banner, apiLimiter, (req, res, next) => {
  res.status(200)
    .send({ data: 'Привет!!!' });
});

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT} port`);
});
