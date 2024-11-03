// https://medium.com/captainme-ai/deploying-migrating-static-create-react-app-project-to-heroku-22-stack-b19a4255ea7c

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Your static pre-build assets folder
app.use(express.static(path.join(__dirname, '..', 'build')));

// Root Redirects to the pre-build assets
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'build'));
});

// Any Page Redirects to the pre-build assets folder index.html that // will load the react app
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, '..', 'build/index.html'));
});

app.listen(port, () => {
  console.log("Server is running on port: ", port)
})
