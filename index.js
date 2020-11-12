const express = require('express');
const port = 8080;
const cors = require("cors");
let path = require("path");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const Player = require('./player/player.js');
const { spawn } = require('child_process');

var players = [];

for(var i = 0; i < 1 ; i++){
    var temp = new Player(port + i + 1);
    players.push(temp);
}

app.listen(port, ()=> {
    console.log("Servidor Música Far-ita encendido");
})

app.get('/', (req, res) => {
    res.send("Todo listo")
})

module.exports = app;