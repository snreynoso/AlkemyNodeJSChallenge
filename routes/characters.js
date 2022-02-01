const { Router } = require('express');
const {
    getAllCharacters,
    createCharacter, 
    deleteCharacter, 
    updateCharacter 
} = require('../controllers/characters')
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/', validateJWT, getAllCharacters);
router.post('/create',validateJWT, createCharacter);
router.delete('/delete/:id', deleteCharacter);
router.put('/update/:id', updateCharacter);
//router.post('?name=nombre',    getByNameCharacter);
//router.post('?age=edad',       getByAgeCharacter);
//router.post('?movies=idMovie', getByMoviesCharacter);

module.exports = router;