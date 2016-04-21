var express = require('express');
var multer  = require ('multer');
var upload  = multer({ dest: 'uploads/'});
var autoReap  = require('multer-autoreap');

var app     = express();
var port    = process.env.PORT || 3000;

app.use(multer({ dest: 'uploads/'}).single('0'));
app.use(autoReap);

//var type    = upload.single('0');

app.post('/api/fileanalyse/', function(req, res) {
  console.log(req.file);
  res.send({
    fileSize: req.file.size
  });
  res.end();
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function() {
  console.log('Listening on port ' + port + '!');
});
