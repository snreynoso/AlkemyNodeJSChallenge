const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
    getAllCharacters,
    createCharacter,
    deleteCharacter,
    updateCharacter,
} = require('../controllers/characters')

const router = Router();

router.get('/',             validateJWT, getAllCharacters);
router.post('/create',      validateJWT, createCharacter);
router.delete('/delete/:id',validateJWT, deleteCharacter);
router.put('/update/:id',   validateJWT, updateCharacter);

module.exports = router;