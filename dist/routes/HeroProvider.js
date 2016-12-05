"use strict";
const express_1 = require('express');
class HeroProvider {
    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Heroes.
     */
    getAll(req, res, next) {
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
exports.HeroProvider = HeroProvider;
// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new HeroProvider();
heroRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = heroRoutes.router;
