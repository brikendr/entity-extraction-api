import {Router, Request, Response, NextFunction} from 'express';

export class HeroProvider {
    router: Router

    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all Heroes.
     */
    public getAll(req: Request, res: Response, next: NextFunction) {
        let heroes = [
            {
                "id": 11,
                "name": "Mr. Nice"
            },
            {
                "id": 12,
                "name": "Narco"
            }
        ];

        res.send(heroes);
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/getHeroes', this.getAll);
    }

}

// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new HeroProvider();
heroRoutes.init();

export default heroRoutes.router;