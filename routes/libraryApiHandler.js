const express = require('express');
const router = express.Router();

const artistController = require('../controllers/artistController');
const albumController = require('../controllers/albumController');
const genreController = require('../controllers/genreController');

//Artist routes and handlers
router.get('/artist/list', artistController.getArtistList);

router.post('/artist/:id/update', artistController.updateSingleArtist);

router.get('/artist/:id', artistController.getSingleArtist);

router.post('/artist/create', artistController.createSingleArtist);

//Album routes and handlers
router.get('/album/list', albumController.getAlbumList);

router.post('/album/:id/update', albumController.updateSingleAlbum);

router.get('/album/:id', albumController.getSingleAlbum);

router.post('/album/create', albumController.createSingleAlbum);

//Genre routes and handlers
router.get('/genre/list', genreController.getGenreList);

router.post('/genre/create', genreController.createGenre);

module.exports = router;
