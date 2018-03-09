const Artist = require('../models/artist');
const Album = require('../models/album');

exports.getArtistList = async function(req, res, next) {
    try {
        let artistList = await Artist.find()
                    .sort([['name', 'ascending']])
                    .exec();
        
        let artistListFormatted = formatArtistListData(artistList);
        res.json(artistListFormatted);
    } catch(err) {
        return next(err);
    }
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

exports.getSingleArtist = async function(req, res, next) {
    let artistId = req.params.id;

    try { 
        let artist = await Artist.findById(artistId)
                    .populate('albums')
                    .exec();
        
        artist = formatArtistData(artist);
        res.json(artist);
    } catch(err) {
        return next(err);
    }
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

exports.createSingleArtist = async function(req, res, next) {
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
        try {
            await artist.save();
            res.json({message: 'Artist created successfully', artist_id: artist._id});
        } catch(err) {
            return next(err);
        }
    }

};

exports.updateSingleArtist = async function(req, res, next) {
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
        try {
            let foundArtist = await Artist.findById(artistId);

            foundArtist._id = artistId;
            foundArtist.name = artist.name;
            foundArtist.dateOfBirth = (artist.dateOfBirth == null) ? foundArtist.dateOfBirth : artist.dateOfBirth;
            foundArtist.albums.push(...artist.albums);

            await foundArtist.save();
            res.json({message: 'Artist updated successfully', artist_data: updatedArtist});
        } catch(err) {
            return next(err);
        }
    }
};