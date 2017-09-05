const Genre = require('../models/genre');
const Album = require('../models/album');

exports.getGenreList = function(req, res, next) {
    Genre.find()
        .sort([['name', 'ascending']])
        .exec(function doneGettingGenreList(err, genreList) {
            if (err) {
                return next(err);
            }
            
            res.json(genreList);
        });
};

exports.createGenre = function(req, res, next) {
    req.checkBody('name', 'Genre name required').notEmpty(); 
    req.sanitize('name').escape();
    req.sanitize('name').trim();
    
    let errors = req.validationErrors();

    //Create a genre object with escaped and trimmed data.
    let genre = new Genre(
      { name: req.body.name }
    );
    
    if (errors) {
        res.json({message: 'Error occured', error: errors});
        return;
    } 
    else {
        //Check if Genre with same name already exists
        Genre.findOne({ 'name': req.body.name })
            .exec( function(err, foundGenre) {
                 if (err) { return next(err); }
                 
                 if (foundGenre) { 
                    res.json({message: 'Genre exists already', genre_id: foundGenre._id});
                 }
                 else {
                     genre.save(function (err) {
                       if (err) { return next(err); }
                       res.json({message: 'Genre successfully added', genre_id: genre._id});
                     });
                     
                 }
             });
    }
};