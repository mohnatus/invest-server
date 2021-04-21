var express = require('express');
var router = express.Router();

const { getBalance } = require('../api');

router.get('/', function (req, res, next) {
  console.log('params', res.params)
  res.json({});
  return;
  res.set('Access-Control-Allow-Origin', '*');
  return getBalance()
    .then((data) => {
      return res.json({});
    })
    .catch((response) => {
      return res.json({
        error: response
      });
    });
});

module.exports = router;
