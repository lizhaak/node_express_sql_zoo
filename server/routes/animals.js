var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/zoo';
var randomNumber = require('./randomNumber');

router.get('/', function(req, res) {
  // Retrieve books from database
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM animals', function (err, result) {
      done();

      if (err) {
        res.sendStatus(500);
      }

      res.send(result.rows);

    });
  });
});

router.post('/', function (req, res) {
  var animal = req.body;
  var numberOfAnimals = randomNumber.randomNumber(1, 100);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO animals (animal, animal_count)'
                + 'VALUES ($1, $2)',
                [animal.animal, numberOfAnimals],
                function (err, result) {
                  done();

                  if (err) {
                    res.sendStatus(500);
                  }

                  res.sendStatus(201);
                });
  });
});

module.exports = router;
