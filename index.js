const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const AccountModel = require('./model/account');
const path = require('path');

const accountRouter = require('./router/account');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//bien duong dan thanh file tinh
app.use('/public', express.static(path.join(__dirname, '/public')));

app.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  
  AccountModel.findOne({
    username: username,
  })
  .then(data => {
    if(data) {
      res.json('tai khoan da duoc dang ky tu truoc');
    } else {
      return AccountModel.create({
        username: username,
        password: password,
      });
    }
  })
  .then(data => {
    res.json('tao tk thanh cong  '+ data);
  })
  .catch(err => {
    res.status(500).json('tao tai khoan that bai   ' + err);
  });

});

app.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    AccountModel.findOne({
      username: username,
      password: password
    })
    .then(data => {
      if(data) {
        res.json('login success');
      } else {
        res.status(300).json('dang nhap that bai, sai ten tai khoan or mk');
      }
    })
    .catch(err => {
      res.status(400).json('login fail, server err');
    })
});

app.use('/api/account', accountRouter);

app.get('/', (req, res, next) => {
  const duongDanFile = path.join(__dirname, './home.html');
  res.sendFile(duongDanFile);
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:3000`);
});