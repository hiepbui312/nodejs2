const express = require('express');
const router = express.Router();
const AccountModel = require('../model/account');

router.get('/', (req, res, next) => {
    AccountModel.find({})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json('loi');
    });
});

router.post('/', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
    const newPassword = req.body.newPassword;
    const id = req.params.id;

    AccountModel.findByIdAndUpdate(id, {
        password: newPassword
    })
    .then(data => {
        res.json('cap nhat mk thanh cong  '+data);
    })
    .catch(err => {
        res.status(500).json('loi server');
    });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    AccountModel.findByIdAndDelete(id, {})
    .then(data => {
        res.json('xoa thanh cong  '+data);
    })
    .catch(err => {
        res.status(500).json('loi server');
    })
});

module.exports = router;