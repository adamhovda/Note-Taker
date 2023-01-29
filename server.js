const express = require('express');
const path = require('path');
const notes = require('./db/db.json')
var fs = require('fs');



const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//get request to show saved notes

app.get('/api/notes', (req,res) => {

});


// post request to save notes

app.post('/api/notes', (req,res) =>{
  

})



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);