const express               = require("express");
const bodyParser            = require('body-parser');
const exec                  = require("child_process").exec;
const app                   = express();

// Settings
const qsPath                = "/home/pi/QuickSwitch2.0";
const ssPath                = "/home/pi/QuickSwitch2.0/SwitchServer";
const port                  = 1111;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/html'));

app.get("/", (req, res) => {
    res.redirect("/index");
});

app.get("/index", (req, res) => {
    if(req.query.status == "start"){
        console.log("start");
        exec(`node .${qsPath}/daemon.js start`);
        exec(`node .${ssPath}/daemon.js start`);
    }else{
        console.log("stop");
        exec(`node .${qsPath}/daemon.js stop`);
        exec(`node .${ssPath}/daemon.js stop`);
    }
    res.sendFile(__dirname + "/html/main.html");
});

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`Server läuft auf Port ${port}`);
});