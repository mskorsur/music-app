const Genre = require('../models/genre');
const Album = require('../models/album');

exports.getGenreList = async function(req, res, next) {

    try {
        let genreList = await Genre.find()
                    .sort([['name', 'ascending']])
                    .exec();
        
        let genreListFormatted = formatGenreListData(genreList);
        res.json(genreListFormatted);
    } catch(err) {
        return next(err);
    }
};

function formatGenreListData(genreList) {
    return genreList.map(genre => {
        return {
            id: genre._id,
            name: genre.name
        }
    });
}

exports.createGenre = async function(req, res, next) {
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
        try {
            let existingGenre = await Genre.findOne({ 'name': req.body.name }).exec();

            if (existingGenre) { 
                res.json({message: 'Genre exists already', genre_id: existingGenre._id});
            }
            else {
                await genre.save();
                res.json({message: 'Genre successfully added', genre_id: genre._id});
            }

        } catch(err) {
            return next(err)
        }
    }
};