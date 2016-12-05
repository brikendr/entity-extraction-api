import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser'
import EntityExtractor from './routes/EntityExtractor';
import HeroProvider from './routes/HeroProvider';

// Creates and configures an ExpressJS web server.
class App {

    // Ref to Express Instance
    public express: express.Application;
    
    //Run configuration methods on the Express instance
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    
    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }


    // Configure API endpoints.
    public routes(): void {
        this.express.use('/api/extractor', EntityExtractor);
        this.express.use('/api/heroes', HeroProvider);
    }
}

export default new App().express;