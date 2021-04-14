const rateLimit = require('express-rate-limit');

const CustomError = require('../helpers/custom-error');

// по идее можно добавлять их в MongoDb
const bannedIPs = {};

const banner = (req, res, next) => {
  if (bannedIPs[req.ip] >= Date.now()) {
    throw CustomError(429, `повторите попытку ${new Date(bannedIPs[req.ip])}`);
  }
  return next();
};


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  onLimitReached(req) {
    bannedIPs[req.ip] = Date.now() + 60 * 60 * 1000;
    throw CustomError(429, `Слишком много запросов, повторите попытку ${new Date(bannedIPs[req.ip])}`);
  },
});


module.exports = {
  banner,
  apiLimiter,
};
