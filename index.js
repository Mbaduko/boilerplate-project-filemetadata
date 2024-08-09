const express = require('express');
const cors = require('cors');
const multer = require('multer')
require('dotenv').config()

const  app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const storage = multer.diskStorage({});
const upload = multer({storage});

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'),(req, res) => {
  const {originalname:name, size, mimetype:type} = req.file;
  return res.json({name, type, size});
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
