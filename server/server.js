const { resolve } = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect('mongodb://biczak:28ce475F91@ds121950.mlab.com:21950/battlebookdb');

// Serve Static Files from Public Directory
app.use(express.static(resolve(__dirname, '../public')));

// Initiate the Server on the Designated Port
app.listen(port, () => {
  console.log(`BattleBook is Live on Port: ${port}`);
});
