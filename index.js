var express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.raw({ inflate: true, limit: '100kb', type: 'text/plain' }));

app.get('/', function(req, res){
    console.log(req.ip);
    console.log(req.body);
    res.sendStatus(200);
});
app.post('/', function(req, res){
    console.log(req.ip);
    console.log(req.body);
    res.sendStatus(200);
})

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});