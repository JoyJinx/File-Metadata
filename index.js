var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024,
    files: 1, 
    fields: 1,
  },
});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.post('/api/fileanalyse', upload.single("upfile"), function(req, res){
  console.log(req.file)
  const metadata = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };
  console.log(metadata);
  return res.json(metadata);
})
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
