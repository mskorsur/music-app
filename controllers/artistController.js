const Artist = require('../models/artist');
const Album = require('../models/album');

exports.getArtistList = function(req, res, next) {
    Artist.find()
        .sort([['name', 'ascending']])
        .exec(function doneGettingArtistList(err, artistList) {
            if (err) {
                return next(err);
            }

            let artistListFormatted = formatArtistListData(artistList);
            res.json(artistListFormatted);
        });
};

function formatArtistListData(artistList) {
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
    let artistId = req.params.id;

    Artist.findById(artistId)
        .populate('albums')
        .exec(function doneGettingSingleArtist(err, artist) {
            if (err) {
                return next(err);
            }

            artist = formatArtistData(artist);
            res.json(artist);
        });

};

function formatArtistData(artist) {
    let artistAlbums = formatArtistAlbums(artist.albums);

    return {
        id: artist._id,
        name: artist.name,
        dateOfBirth: artist.getDateOfBirthFormatted,
        albums: artistAlbums,
        url: artist.url
    }
}

function formatArtistAlbums(artistAlbums) {
    return artistAlbumsFormatted = artistAlbums.map(album => {
        return {
            id: album._id,
            name: album.name,
            url: album.url
        }
    });
}

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
    let artistId = req.params.id;
    req.checkBody('name', 'Artist name required');

    req.sanitize('name').escape();
    req.sanitize('name').trim();

    let errors = req.validationErrors();
    let artist = new Artist({
        _id: artistId,
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth || '',
        albums: (req.body.albums == null) ? [] : req.body.albums.split(',')//album ids need to be sent from client
    });

    if (errors) {
        res.json({message: 'Error occured', error: errors});
        return;
    }
    else {
        Artist.findById(artistId, function doneFindingArtist(err, foundArtist) {
            if (err) { return next(err); }

           foundArtist._id = artistId;
           foundArtist.name = artist.name;
           foundArtist.dateOfBirth = (artist.dateOfBirth == null) ? foundArtist.dateOfBirth : artist.dateOfBirth;
           foundArtist.albums.push(...artist.albums);

           foundArtist.save(function doneSavingArtist(err, updatedArtist) {
               if (err) { return next(err); }

               res.json({message: 'Artist updated successfully', artist_data: updatedArtist});
           });
        });
    }

};