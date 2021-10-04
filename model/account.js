const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test2');

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: String,
})

const AccountModel = mongoose.model('account', AccountSchema);

module.exports = AccountModel;