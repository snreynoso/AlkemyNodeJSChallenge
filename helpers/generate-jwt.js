const jwt = require('jsonwebtoken');

const generateJWT = (userId = '') => {
    return new Promise((resolve, reject) => {
        const payload = { userId };

        jwt.sign(payload, process.env.SECRETPRIVATEKEY,
            //{
            //    expiresIn: '4h' // Valid time for token generated
            //},
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Token not generated...')
                } else {
                    resolve(token);
                }
            })
    })
}

module.exports = {
    generateJWT
}