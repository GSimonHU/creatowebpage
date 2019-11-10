const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnyagSchema = new Schema({
    anyagcsoport: Number,
    anyagfajta: String,
    lakossagiar: Number
})

const Anyag = mongoose.model('anyag', AnyagSchema)
module.exports = Anyag;