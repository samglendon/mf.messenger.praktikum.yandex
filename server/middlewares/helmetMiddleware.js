const router = require('express').Router();
const helmet = require('helmet');

const scriptSources = ["'self'", "'unsafe-eval'", 'https://ya-praktikum.tech'];
const styleSources = ["'self'", "'unsafe-inline'", 'ajax.googleapis.com'];
const connectSources = ["'self'"];

router.use(helmet());
router.use(helmet.hidePoweredBy());
router.use(helmet.noSniff());
// router.use(helmet.contentSecurityPolicy({
//   // defaultSrc: ["'self'"],
//   scriptSrc: scriptSources,
//   // styleSrc: styleSources,
//   connectSrc: connectSources,
//   // reportUri: '/report-violation',
//   reportOnly: false,
//   // setAllHeaders: false,
//   safari5: false,
// }));

router.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': ["'self'", "'unsafe-eval'", 'https://ya-praktikum.tech'],
      'script-src-elem': ["'self'"],
      'connect-src': ["'self'", 'ws://localhost:3000', 'https://ya-praktikum.tech', 'wss://ya-praktikum.tech'],
    },
  }),
);

module.exports = router;
