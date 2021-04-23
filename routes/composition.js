var express = require('express');
var router = express.Router();

var fileName = 'composition.json';
var fs = require('fs');

let composition = {};

function updateComposition(data) {
  composition = data;
  saveComposition();
}

function saveComposition() {
  return new Promise((res, rej) => {
    let data = JSON.stringify(composition);
    fs.writeFile(fileName, data, (err) => {
      if (err) {
        rej(err);
      } else {
        res();
      }
    });
  });
}

fs.access(fileName, (err) => {
  if (err) {
    saveComposition()
      .then(() => console.log('Файл composition.json создан'))
      .catch((err) => console.error(err));
  } else {
    let str = fs.readFileSync(fileName);
    composition = JSON.parse(str);
    console.log('Получен состав портфеля:', composition);
  }
});

router.get('/', function (req, res, next) {
  return res.json({ composition });
});

router.get('/percents', function (req, res, next) {
  return res.json({ percents: composition.percents });
});

router.post('/', function (req, res, next) {
  return res.json(updateComposition(req.body));
});

module.exports = router;
