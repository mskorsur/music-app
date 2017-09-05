const Artist = require('../models/artist');
const Album = require('../models/album');

exports.getArtistList = function(req, res, next) {
    Artist.find()
        .sort([['name', 'ascending']])
        .exec(function doneGettingArtistList(err, artistList) {
            if (err) {
                return next(err);
            }

            let artistListFormatted = formatArtistData(artistList);
            res.json(artistListFormatted);
        });
};

function formatArtistData(artistList) {
    return artistList.map(function formatArtist(artist) {
        return {
            id: artist._id,
            name: artist.name,
            dateOfBirth: artist.getDateOfBirthFormatted,
            url: artist.url
        }
    }); 
}

exports.getSingleArtist = function(req, res, next) {
    let artistID = req.params.id;

};

exports.createSingleArtist = function(req, res, next) {
    req.checkBody('name', 'Artist name required');

    req.sanitize('name').escape();
    req.sanitize('name').trim();

    let errors = req.validationErrors();

    let artist = new Artist({
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth || ''
    });

    if (errors) {
        res.json({message: 'Error occured', error: errors});
        return;
    }
    else {
        artist.save(function doneSavingArtist(err) {
            if (err) { return next(err); }

            res.json({message: 'Artist created successfully', artist_id: artist._id});
        });
    }

};

exports.updateSingleArtist = function(req, res, next) {

};