const User = require('../database/DBmodels/user');
const { generateJWT } = require("../helpers/generate-jwt");

const register = async (req, res) => {
    const { ...data } = req.body;
    try {
        await User.create(data); // Save in DB
        res.json({
            msg: `User ${data.name} created!`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.errors[0].message
        })
    }
}

const login = async (req, res) => {
    const { name, password } = req.body;
    try {
        // Check if name exists
        const user = await User.findOne({ where: { name: name } });

        if (!user) {
            return res.status(400).json({
                msg: 'Invalid user name'
            });
        }

        // Check password
        if (user.password !== password) {
            return res.status(400).json({
                msg: 'Invalid password'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ups, server error'
        })
    }
}

module.exports = {
    register,
    login
} 