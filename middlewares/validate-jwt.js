const jwt = require('jsonwebtoken');
const User = require('../database/DBmodels/user');

const validateJWT = async (req, res, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token recieved'
        });
    }

    try {
        const { userId } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        const user = await User.findOne({ where: { id: userId } });;

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token - auth user does not exist'
            });
        }

        req.authUser = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }
}

module.exports = {
    validateJWT
} 