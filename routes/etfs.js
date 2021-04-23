var express = require('express');
const jsonParser = express.json();
var router = express.Router();

var fileName = 'etfs.json';
var fs = require('fs');

let etfs = [];
let counter = 1;

function updateEtf(id, data) {
  if (!id) {
    return {
      error: 'No id'
    };
  }
  console.log('update 2', id);
  if (!data.ticker) {
    return {
      error: 'No ticker'
    };
  }

  let etf = {
    ...data,
    id: id,
  };

  let index = etfs.findIndex((e) => e.id == id);


  if (index > -1) {
    etfs.splice(index, 1, etf);
  } else {
    etfs.push(etf);
  }

  saveEtfs();

  return {
    etfs
  };
}

function deleteEtf(id) {
  if (!id) {
    return {
      error: 'No id'
    };
  }
  let index = etfs.findIndex((e) => e.id == id);
  if (index > -1) {
    etfs.splice(index, 1);
  }

  saveEtfs();

  return {
    etfs
  };
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
    saveEtfs()
      .then(() => console.log('Файл etfs.json создан'))
      .catch((err) => console.error(err));
  } else {
    let str = fs.readFileSync(fileName);
    etfs = JSON.parse(str);
    counter = Math.max(...etfs.map((e) => e.id)) + 1;
    console.log('Получены фонды:', etfs, counter);
  }
});

router.get('/', function (req, res, next) {
  res.json({
    etfs: etfs
  });
  return;
});

router.post('/create', jsonParser, function (req, res, next) {
  res.json(updateEtf(counter++, req.body));
});

router.post('/update/:id', function (req, res, next) {
  res.json(updateEtf(req.params['id'], req.body));
});

router.get('/delete/:id', function (req, res, next) {
  res.json(deleteEtf(req.params['id']));
});

module.exports = router;
