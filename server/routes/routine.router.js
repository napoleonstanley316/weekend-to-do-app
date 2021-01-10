const express = require('express');
const routineRouter = express.Router();
const pool = require('../modules/pool');

// Get tasks
routineRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "routines" ORDER BY "id";';
    pool.query(queryText)
    .then(result => {
        console.log(result);
      // Sends back the results in an object
      res.send(result.rows);
    }).catch(error => {
      console.log('error getting routines', error);
      res.sendStatus(500);
    });
  });

// POST
routineRouter.post('/',  (req, res) => {
    let newTask = req.body;
    console.log(`Adding routine`, newRoutine);
  
    let queryText = `INSERT INTO "routines" ("day", "task", "time", "comment")
                     VALUES ($1, $2, $3, $4);`;

    pool.query(queryText, [req.body.day, req.body.task, req.body.time, req.body.comment])
      .then(result => {
        res.sendStatus(201);
      }).catch(error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
  });

module.exports = routineRouter;