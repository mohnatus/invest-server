var express = require('express');
var router = express.Router();

const { getPortfolio } = require('../api');

router.get('/', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  return getPortfolio()
    .then((data) => {
      return res.json({
        portfolio: data
      });
    })
    .catch((response) => {
      return res.json({
        error: response
      });
    });
});

module.exports = router;
