require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

server.listen();


// require('dotenv').config();
// const express = require('express')
// const app = express()
// const sequelize = require('./database/db');

// const character = require('./routes/character');
// const register = require('./routes/auth');
// //const login = require('./routes/login');

// const SERVER_PORT = process.env.SERVER_PORT || 3000;

// // Middleware
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }));

// app.use('/character', character); // apiRouter will manege all routes which includes '/character'
// app.use('/', register);
// //app.use('/auth/login', login);

// // Server start
// app.listen(SERVER_PORT, () => {
//     console.log(`App listening at http://localhost:${SERVER_PORT}`);

//     // Connect to database
//     // sequelize.authenticate()
//     sequelize.sync({ force: false })
//         .then(() => {
//             console.log('Connection has been established successfully.');
//         }).catch(error => {
//             console.error('Unable to connect to the database:', error);
//         })
// })
