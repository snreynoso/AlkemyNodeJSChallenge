const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
    getAllMovies,
    createMovie,
    deleteMovie,
    updateMovie,
} = require('../controllers/movies')

const router = Router();

router.get('/',              validateJWT, getAllMovies);
router.post('/create',       validateJWT, createMovie);
router.delete('/delete/:id', validateJWT, deleteMovie);
router.put('/update/:id',    validateJWT, updateMovie);

module.exports = router;