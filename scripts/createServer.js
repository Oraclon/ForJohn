const express = require('express');
const ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
const app = express();

require('dotenv').config()

const server = new ParseServer({
  databaseURI: process.env.DB_URI,
  cloud: './cloud/main.js',
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL
});

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": process.env.SERVER_URL,
      "appId": process.env.APP_ID,
      "masterKey": process.env.MASTER_KEY,
      "appName": "MyApp"
    }
  ]
});

server.start();

app.use('/dashboard', dashboard);
app.use('/parse', server.app);

//parse-dashboard --appId NqqPKd9Mzzdk0Es6P7NdzXOXNb4tsqdq6Q8p0cZi --masterKey WEwN5oQVcXNFpmDVgArtWqJUb8YtJIgFkE3dI4du --serverURL http://localhost:5000/parse

app.listen(process.env.SERVER_PORT, function() {
    const message = `

     ===========================================
     [UP]: Server Status.
     [PORT]: ${ process.env.SERVER_PORT }
     [API URL]: ${ process.env.SERVER_URL } 
     ===========================================

     `
  console.log(message);
});