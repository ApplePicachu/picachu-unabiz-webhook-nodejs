var express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send("Hello");
});
app.post('/', function(req, res){
    console.log(JSON.stringify(req));
})

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});