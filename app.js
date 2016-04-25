var express = require('express');
var multer  = require ('multer');
var upload  = multer({ dest: 'uploads/'});
var fs      = require('fs');

var app     = express();
var port    = process.env.PORT || 3000;

app.use(multer({ dest: 'uploads/'}).single('0'));

app.post('/api/fileanalyse/', function(req, res) {
  res.send({
    fileSize: req.file.size
  });
  fs.stat(req.file.path, function(err, stats) {
    if (!err && stats.isFile()) {
      fs.unlink(req.file.path);
      console.log('removed %s', req.file.path);
    }
  });
  res.end();
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function() {
  console.log('Listening on port ' + port + '!');
});
