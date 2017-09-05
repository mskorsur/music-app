const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

let albumSchema = new Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 50},
    artist: {type: Schema.ObjectId, ref: 'Artist', required: true},
    genre: [{type: Schema.ObjectId, ref: 'Genre', required: true}],
    releaseDate: {type: Date}
});

albumSchema
.virtual('url')
.get(function() {
    return '/api/album/' + this._id;
});

albumSchema
.virtual('getReleaseDateFormatted')
.get(function() {
    let releaseDate = this.releaseDate ? moment(this.releaseDate).format('DD-MM-YYYY') : '';
    return releaseDate;
});

module.exports = mongoose.model('Album', albumSchema);