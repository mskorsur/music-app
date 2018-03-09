const Album = require('../models/album');
const Artist = require('../models/artist');
const Genre = require('../models/genre');
const async = require('async');

exports.getAlbumList = async function(req,res) {
    try {
        let albumList = await Album.find()
                        .sort([['name', 'ascending']])
                        .exec();

        let albumListFormatted = formatAlbumList(albumList);
        res.json(albumListFormatted);
    } catch(err) {
        return next(err);
    }
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

exports.getSingleAlbum = async function(req, res, next) {
    let albumId = req.params.id;

    try { 
        let album = await Album.findById(albumId)
                    .populate('artist')
                    .populate('genre')
                    .exec();

        album = formatAlbumData(album);
        res.json(album);
    } catch (err) {
        return next(err);
    }
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

exports.createSingleAlbum = async function(req, res, next) {
    checkIfRequiredAlbumDataIsPresent(req);
    escapeAndTrimAlbumData(req);

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
        try {
            await album.save();

            //album is saved successfully so update corresponding artist's album
            //list with this newly added album
            await updateCorrespondingArtistAlbumList(req.body.artist, album);
            res.json({message: 'Album created successfully', album_id: album._id});

        } catch (err) {
            return next(err);
        }
    }
};

function checkIfRequiredAlbumDataIsPresent(req) {
    req.checkBody('name', 'Missing name').notEmpty();
    req.checkBody('artist', 'Missing artist').notEmpty();
    req.checkBody('genre', 'Missing genre').notEmpty();
}

function escapeAndTrimAlbumData(req) {
    req.sanitize('name').escape();
    req.sanitize('artist').escape();
    req.sanitize('genre').escape();
    req.sanitize('name').trim();
    req.sanitize('artist').trim();
    req.sanitize('genre').trim();
}

async function updateCorrespondingArtistAlbumList(artistId, newAlbum) {
    try {
        let foundArtist = await Artist.findById(artistId);
        foundArtist.albums.push(newAlbum);

        let updatedArtist = await foundArtist.save();
        console.log('Artist albums update successful during album creation/update ' + updatedArtist);
    } catch(err) {
        console.log('Error during artist albums update ' + err);
    }
}

exports.updateSingleAlbum = async function(req,res) {
    let albumId = req.params.id;

    checkIfRequiredAlbumDataIsPresent(req);
    escapeAndTrimAlbumData(req);

    let errors = req.validationErrors();

    let album = new Album({
        _id: albumId,
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
        try {
            let foundAlbum = await Album.findById(albumId);

            const originalArtist = foundAlbum.artist;
            foundAlbum._id = albumId;
            foundAlbum.name = album.name;
            foundAlbum.artist = album.artist;
            foundAlbum.releaseDate = (album.releaseDate == null) ? foundAlbum.releaseDate : album.releaseDate;
            foundAlbum.genre = [...album.genre];

            let updatedAlbum = await foundAlbum.save();

            if (originalArtist !== updatedAlbum.artist) {
                await updateCorrespondingArtistAlbumList(updatedAlbum.artist, updatedAlbum);
                await deleteAlbumFromFormerArtistAlbumList(originalArtist, updatedAlbum);
            }
            
            res.json({message: 'Album updated successfully', album_data: updatedAlbum});
        } catch(err) {
            return next(err);
        }
    }

    async function deleteAlbumFromFormerArtistAlbumList(artistId, oldAlbum) {
        try {
            let foundArtist = await Artist.findById(artistId);

            let newAlbums = foundArtist.albums.filter(album => album.toString() != oldAlbum._id);
            foundArtist.albums = [...newAlbums];

            let updatedArtist = await foundArtist.save();
            console.log('Artist albums update successful during album creation/update ' + updatedArtist);
        } catch(err) {
            console.log('Error during artist albums update ' + err);
        }
    }
};