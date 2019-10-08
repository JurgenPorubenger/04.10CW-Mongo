const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const formSchema = new Schema({
        username: String,
        email: String,
        pwd: String,
});


const Model = mongoose.model('formSchema', formSchema);
module.exports = Model;