const express = require('express');
const cors = require('cors');
//const fileUpload = require('express-fileupload');
const sequelize = require('../database/config');
const SERVER_PORT = process.env.SERVER_PORT || 3000;
require('../database/associations');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.SERVER_PORT;

        this.paths = {
            auth:      '/auth',
            character: '/characters',
        }

        // DB Connect
        this.connectDB();
        // Middlewares
        this.middlewares();
        // My app routes
        this.routes();
    }

    async connectDB() {
        await sequelize.sync({ force: false })
            .then(() => {
                console.log('Connection has been established successfully.');
            }).catch(error => {
                console.error('Unable to connect to the database:', error);
            })
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Reading data Body 
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        // Public DIR
        //this.app.use(express.static('public'));
        // FileUpload
        ///this.app.use(fileUpload({
        //    useTempFiles: true,
        //    tempFileDir: '/tmp'
        //}));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.character, require('../routes/characters'));
    }

    listen() {
        this.app.listen(SERVER_PORT, () => {
            console.log(`App listening at http://localhost:${SERVER_PORT}`);
        })
    }
}

module.exports = Server;