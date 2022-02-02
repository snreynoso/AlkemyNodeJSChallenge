const Character = require('../database/DBmodels/character');
const Movie = require('../database/DBmodels/movie');
const Character_Movie = require('../database/associations');

const getAllCharacters = async (req, res) => {
    
    // If there is no query, show all characters
    if (!Object.entries(req.query).length) { 
        await Character.findAll({
            attributes: ['avatar', 'name']
        }).then(dbResult => {
            res.json(dbResult);
        }).catch(e => {
            console.log(e);
            res.status(500).json(e);
        })
    } else {
        const queryKey = Object.keys(req.query);

        if (queryKey == 'name') {
            const characters = await Character.findAll({
                where: {
                    name: req.query.name
                },
                attributes: ['avatar', 'name', 'age', 'weight', 'story'],
                include: {
                    model: Movie,
                    attributes: ['title', 'avatar', 'date', 'rating'],
                    through: {attributes: []} 
                }
            })
            res.json(characters);
            
        } else if (queryKey == 'age') {
            const characters = await Character.findAll({
                where: {
                    age: req.query.age
                },
                attributes: ['avatar', 'name', 'age', 'weight', 'story'],
                include: {
                    model: Movie,
                    attributes: ['title', 'avatar', 'date', 'rating'],
                    through: {attributes: []} 
                }
            })
            res.json(characters);
        } else if (queryKey == 'movies') {
            const characters = await Movie.findAll({
                where: {
                    title: req.query.movies
                },
                attributes: ['title', 'avatar', 'date', 'rating'],
                include: {
                    model: Character,
                    attributes: ['avatar', 'name', 'age', 'weight', 'story'],
                    through: {attributes: []} 
                }
            })
            res.json(characters);
        }
    }
}

const createCharacter = async (req, res) => {
    const { ...data } = req.body;

    try {
        const character = await Character.create({
            avatar: data.avatar,
            name:   data.name,
            age:    data.age,
            weight: data.weight,
        });

        // Check if the movies assiociated with de Caharacter already exist
        data.movies.forEach(async movie => {
            const [movieBD] = await Movie.findOrCreate({
                where: { title: movie.title },
                defaults: movie
            })

            // Create the association in through table
            await Character_Movie.create({
                characterId: character.id,
                movieId: movieBD.id
            });
        })

        res.json({
            msg: `Character ${character.name} created!`,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

const deleteCharacter = async (req, res) => {
    // First check if the character id exist
    await Character.findAll({
        where: {
            id: req.params.id
        }
    }).then(async dbResult => {
        if (!dbResult.length) {
            res.status(401).json({
                msg: `Invalid character id: ${req.params.id}`
            });
        }
        else { // If the id exist, delete it
            await Character.destroy({
                where: {
                    id: req.params.id
                }
            }).then(() => {
                res.json({
                    msg: 'Character deleted'
                });
            })
        }
    }).catch(e => {
        console.log(e);
        res.status(500).json(e);
    })
}

const updateCharacter = async (req, res) => {
    // First check if the characters id exist
    await Character.findAll({
        where: {
            id: req.params.id
        }
    }).then(async dbResult => {
        if (!dbResult.length) {
            res.status(401).json({
                msg: `Invalid character id: ${req.params.id}`
            });
        }
        else { // If the id exist, update it
            const { ...data } = req.body;

            if (!Object.keys(data).length) { // Check if there is no value to update
                res.status(401).json({
                    msg: 'No values to update'
                });
            } else {
                await Character.update(data, {
                    where: {
                        id: req.params.id
                    }
                }).then(() => {
                    res.json({
                        msg: 'Character updated'
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
    getAllCharacters,
    createCharacter,
    deleteCharacter,
    updateCharacter
}