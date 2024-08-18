const express = require('express')
const app = express()
const fs = require('fs');

const jsonFilePath = './data/address.json';
const cors = require('cors');
let json;
let arr = [];

app.use(cors());

app.use(express.json());

app.use(function(req, res, next){

  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      return console.log('Error reading file' + err.message)
    }

    json = JSON.parse(data);
    arr = Object.keys(json).map(key => json[key]);


    next();
});
})


app.get('/get-data', (req, res) => {

    res.send({
    status: 0,
    message: 'success',
    data: arr
  })
});


app.post('/add-data', (req, res) => {

  const newData = req.body;
  
    console.log(newData);
    arr.push(newData);

    fs.writeFile(jsonFilePath, JSON.stringify(arr), 'utf8', (writeErr) => {
      if (writeErr) {
        res.status(500).send('Error writing file');
      } else {
        res.status(200).send('Data added successfully');
      }
    });
    
  });



app.listen(80, () => {
  console.log('http://127.0.0.1')
})