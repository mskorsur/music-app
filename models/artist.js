const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

let artistSchema = new Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 50},
    dateOfBirth: {type: Date}, 
    albums: [{type: Schema.ObjectId, ref: 'Album'}]
});

artistSchema
.virtual('url')
.get(function() {
    return '/api/artist/' + this._id;
});

artistSchema
.virtual('getDateOfBirthFormatted')
.get(function() {
    let dateOfBirth = this.dateOfBirth ? moment(this.dateOfBirth).format('DD-MM-YYYY'): '';
    return dateOfBirth;
});

module.exports = mongoose.model('Artist', artistSchema);