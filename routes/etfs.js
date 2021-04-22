var express = require('express');
var router = express.Router();

const { getEtfs } = require('../api');

router.get('/', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  return getEtfs()
    .then((data) => {
      return res.json({
        etfs: data
      });
    })
    .catch((response) => {
      return res.json({
        error: response
      });
    });
});

module.exports = router;
