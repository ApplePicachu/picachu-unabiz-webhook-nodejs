var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.raw({ inflate: true, limit: '100kb', type: 'text/plain' }));

app.post('/', function (req, res) {
    console.log(req.ip);
    console.log(req.body);
    res.sendStatus(200);
    // An object of options to indicate where to post to
    var post_options = {
        host: '118.24.143.101',
        port: '8088',
        path: '/unabiz',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(req.body))
        }
    };
    // Set up the request
    var post_req = http.request(post_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });
    post_req.write(JSON.stringify(req.body));
    post_req.end();
})

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});