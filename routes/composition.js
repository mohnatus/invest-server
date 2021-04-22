var express = require('express');
var router = express.Router();

const composition = require('../data/composition');

router.get('/', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  return res.json(composition);
});

router.post('/', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  return res.json(composition);
});

module.exports = router;
