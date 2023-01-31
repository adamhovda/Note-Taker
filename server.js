const express = require('express');
const app = express();
const path = require('path');
const notes = require('./db/db.json');
var uniqid = require('uniqid'); 
var fs = require('fs');

// const bodyParser = require("body-parser"); 
// router.use(bodyParser.json());

const util = require('util');
const { request } = require('http');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

app.use(express.static('public'));

const PORT = 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

//get request to show saved notes

app.get('/api/notes', (req,res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))

});


// post request to save notes

app.post('/api/notes', (req,res) =>{
    let addedNote = req.body;
    addedNote.id = uniqid();
    


      var data = fs.readFileSync('./db/db.json');
      var json = JSON.parse(data);
      json.push(addedNote);


      fs.writeFile("./db/db.json", JSON.stringify(json, null, 2), (err) =>
      err ? console.log(err) : console.log("success"))


      
      
      res.json("success")
    // })
})

app.delete('/api/notes/:id', (req,res) => {
  const requestedId = req.params.id
  console.log(typeof requestedId)
  res.json(requestedId)


});



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);