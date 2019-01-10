const express = require('express')  
const path = require("path");

const app = express()  
const port = 5000

function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}

app.use(allowCrossDomain)

app.use('/', express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 5000, (err) => {  
  if (err) {
    return console.log('Error:', err)
  }
  console.log(`server is listening on ${port}`)
})

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});