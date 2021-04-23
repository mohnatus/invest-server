var express = require('express');
const jsonParser = express.json();
var router = express.Router();

var fileName = 'etfs.json';
var fs = require('fs');

let etfs = [];

function updateEtf(data) {
  if (!data.ticker) {
    return {
      error: 'No ticker'
    };
  } else {
    let index = etfs.findIndex((e) => e.ticker == data.ticker);
    if (index > -1) {
      etfs.splice(index, 1, data);
    } else {
      etfs.push(data);
    }

    saveEtfs();

    return {
      etfs
    };
  }
}

function deleteEtf(ticker) {
  if (!ticker) {
    return {
      error: 'No ticker'
    };
  } else {
    let index = etfs.findIndex((e) => e.ticker == ticker);
    if (index > -1) {
      etfs.splice(index, 1);
    }

    saveEtfs();

    return {
      etfs
    };
  }
}

function saveEtfs() {
  return new Promise((res, rej) => {
    let data = JSON.stringify(etfs);
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
    saveEtfs().then(() => console.log('Файл etfs.json создан')).catch(err => console.error(err));
  } else {
    let str = fs.readFileSync(fileName);
    etfs = JSON.parse(str);
    console.log('Получены фонды:', etfs);
  }
});

router.get('/', function (req, res, next) {
  res.json({
    etfs: etfs
  });
  return;
});

router.post('/create', jsonParser, function (req, res, next) {
  res.json(updateEtf(req.body));
});

router.post('/update', function (req, res, next) {
  res.json(updateEtf(req.body));
});

router.get('/delete/:ticker', function (req, res, next) {
  res.json(deleteEtf(req.params['ticker']));
});

module.exports = router;
