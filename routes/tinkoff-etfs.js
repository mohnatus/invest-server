var express = require('express');
var router = express.Router();

const { getEtfs } = require('../api');

router.get('/', function (req, res, next) {
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
