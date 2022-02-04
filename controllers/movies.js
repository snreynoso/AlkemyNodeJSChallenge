const Character = require('../database/DBmodels/character');
const Movie = require('../database/DBmodels/movie');

const getAllMovies = async (req, res) => {

    // If there is no query, show all movies
    if (!Object.entries(req.query).length) {
        await Movie.findAll({
            attributes: ['avatar', 'title', 'date']
        }).then(dbResult => {
            res.json(dbResult);
        }).catch(e => {
            console.log(e);
            res.status(500).json(e);
        })
    } else {
        const queryKey = Object.keys(req.query);

        if (queryKey == 'title') {
            const movies = await Movie.findAll({
                where: {
                    title: req.query.title
                },
                attributes: ['title', 'avatar', 'date', 'rating'],
                include: {
                    model: Character,
                    attributes: ['avatar', 'name', 'age', 'weight', 'story'],
                    through: { attributes: [] }
                }
            })
            res.json(movies);

        } else if (queryKey == 'genre') {
            const movies = await Movie.findAll({
                where: {
                    genre: req.query.genre
                },
                attributes: ['title', 'avatar', 'date', 'rating'],
                include: {
                    model: Character,
                    attributes: ['avatar', 'name', 'age', 'weight', 'story'],
                    through: { attributes: [] }
                }
            })
            res.json(movies);

        } else if (queryKey == 'order') {
            const movies = await Movie.findAll({
                order: [
                    ['date', req.query.order]
                ],
                attributes: ['title', 'avatar', 'date', 'rating'],
                include: {
                    model: Character,
                    attributes: ['avatar', 'name', 'age', 'weight', 'story'],
                    through: { attributes: [] }
                }
            })
            res.json(movies);
        }
    }
}

const createMovie = async (req, res) => {
    const { ...data } = req.body;

    try {
        const movie = await Movie.create({
            title: data.title,
            avatar: data.avatar,
            date: data.date,
            rating: data.rating
        });

        res.json({
            msg: `Movie ${movie.title} created!`,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

const deleteMovie = async (req, res) => {
    // First check if the movie id exist
    await Movie.findAll({
        where: {
            id: req.params.id
        }
    }).then(async dbResult => {
        if (!dbResult.length) {
            res.status(401).json({
                msg: `Invalid movie id: ${req.params.id}`
            });
        }
        else { // If the id exist, delete it
            await Movie.destroy({
                where: {
                    id: req.params.id
                }
            }).then(() => {
                res.json({
                    msg: 'Movie deleted'
                });
            })
        }
    }).catch(e => {
        console.log(e);
        res.status(500).json(e);
    })
}

const updateMovie = async (req, res) => {
    // First check if the characters id exist
    await Movie.findAll({
        where: {
            id: req.params.id
        }
    }).then(async dbResult => {
        if (!dbResult.length) {
            res.status(401).json({
                msg: `Invalid movie id: ${req.params.id}`
            });
        }
        else { // If the id exist, update it
            const { ...data } = req.body;

            if (!Object.keys(data).length) { // Check if there is no value to update
                res.status(401).json({
                    msg: 'No values to update'
                });
            } else {
                await Movie.update(data, {
                    where: {
                        id: req.params.id
                    }
                }).then(() => {
                    res.json({
                        msg: 'Movie updated'
                    });
                })
            }
        }
    }).catch(e => {
        console.log(e);
        res.status(500).json(e);
    })
}

module.exports = {
    getAllMovies,
    createMovie,
    deleteMovie,
    updateMovie
}