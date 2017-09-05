const Album = require('../models/album');
const Artist = require('../models/artist');
const Genre = require('../models/genre');
const async = require('async');

exports.getAlbumList = function(req,res) {
    Album.find()
        .sort([['name', 'ascending']])
        .exec(function doneGettingAlbumList(err, albumList) {
            if (err) {
                return next(err);
            }

            let albumListFormatted = formatAlbumList(albumList);
            res.json(albumListFormatted);
        });
};

function formatAlbumList(albumList) {
    return albumList.map(function formatAlbum(album) {
        return {
            id: album._id,
            name: album.name,
            releaseDate: album.getReleaseDateFormatted,
            url: album.url
        }
    });
}

exports.getSingleAlbum = function(req, res, next) {
    let albumId = req.params.id;

    Album.findById(albumId)
        .populate('artist')
        .populate('genre')
        .exec(function doneGettingSingleAlbum(err, album) {
            if (err) {
                return next(err);
            }

            album = formatAlbumData(album);
            res.json(album);
        });

};

function formatAlbumData(album) {
    let albumArtist = formatAlbumArtistData(album.artist);
    let albumGenres = formatAlbumGenreData(album.genre);

    return {
        id: album._id,
        name: album.name,
        artist: albumArtist,
        releaseDate: album.getReleaseDateFormatted,
        genre: albumGenres,
        url: album.url
    }
}

function formatAlbumArtistData(albumArtist) {
    return {
        id: albumArtist._id,
        name: albumArtist.name,
        url: albumArtist.url
    }
}

function formatAlbumGenreData(albumGenres) {
    return albumGenresFormatted = albumGenres.map(genre => {
        return {
            id: genre._id,
            name: genre.name
        }
    });
}

exports.createSingleAlbum = function(req, res, next) {
    req.checkBody('name', 'Missing name').notEmpty();
    req.checkBody('artist', 'Missing artist').notEmpty();
    req.checkBody('genre', 'Missing genre').notEmpty();
    
    req.sanitize('name').escape();
    req.sanitize('artist').escape();
    req.sanitize('genre').escape();
    req.sanitize('name').trim();
    req.sanitize('artist').trim();
    req.sanitize('genre').trim();

    let errors = req.validationErrors();

   
    let album = new Album({
        name: req.body.name,
        artist: req.body.artist, //artist id needs to be sent here from client
        releaseDate: req.body.releaseDate || '',
        genre: req.body.genre.split(',') //genre ids need to be sent here from client
    });

    if (errors) {
        res.json({message: 'Error occured', error: errors});
        return;
    } 
    else {
        album.save(function doneSavingAlbum(err) {
            if (err) { return next(err); }

            res.json({message: 'Album created successfully', album_id: album._id});
        });
    }
};


exports.updateSingleAlbum = function(req,res) {

};