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
    console.log(`Adding routine`, newTask);
  
    let queryText = `INSERT INTO "routines" ("day", "task", "time", "complete", "comment")
                     VALUES ($1, $2, $3, $4, $5);`;

    pool.query(queryText, [req.body.day, req.body.task, req.body.time, req.body.complete, req.body.comment])
      .then(result => {
        res.sendStatus(201);
      }).catch(error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
  });


//DELETE 
// Removes task based on 'id'.  'id' is not visible on the DOM, but is a property in the database
routineRouter.delete('/:id',  (req, res) => {
  let id = req.params.id; // id of the thing to delete
  console.log('Delete route called with id of', id);

  const queryText = `DELETE FROM "routines" WHERE "id" = $1;`

  // TODO - REPLACE BELOW WITH YOUR CODE
  pool.query(queryText, [req.params.id])
  .then((result) => {
      console.log(result);
      res.sendStatus(204)
  }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  })

});


// PUT function updates completion status in server
routineRouter.put("/:id", (req, res) => {
  let taskComplete = req.body.complete;
  let id = req.params.id;
  let queryText;

  console.log(taskComplete);

  if(taskComplete === 'false') {
    queryText = `UPDATE "routines"
                SET "complete" = true
                WHERE "id" = $1;`;
  }else if(taskComplete === 'true') {
    queryText = `UPDATE "routines"
                SET "complete" = false
                WHERE "id" = $1;`;
  };
  

  console.log(
    `Updating Task with ${id}, setting complete to:`,
    taskComplete
  );

  pool.query(queryText, [id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(200);
    });
});

module.exports = routineRouter;