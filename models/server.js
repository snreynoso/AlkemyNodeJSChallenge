const express = require('express');
const cors = require('cors');
const sequelize = require('../database/config');

require('../database/associations');

const SERVER_PORT = process.env.SERVER_PORT || 3000;

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.SERVER_PORT;

        this.paths = {
            auth:      '/auth',
            character: '/characters',
            movie:     '/movies',
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
    }

    routes() {
        this.app.use(this.paths.auth,       require('../routes/auth'));
        this.app.use(this.paths.character,  require('../routes/characters'));
        this.app.use(this.paths.movie,      require('../routes/movies'));
    }

    listen() {
        this.app.listen(SERVER_PORT, () => {
            console.log(`App listening at http://localhost:${SERVER_PORT}`);
        })
    }
}

module.exports = Server;