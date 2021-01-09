const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task.router.js');

app.use(bodyParser.urlencoded({extended: true}));

// ROUTES
app.use('/tasks', taskRouter)

// Serve back static files by default
app.use(express.static('server/public'));

// Start listening for requests on a specific port or port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
