"use strict";
const express_1 = require('express');
class HeroRouter {
    /*
    *  Initialize the HeroRouter
    * */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /*
    *  GET all heroes.
    */
    getAll(req, res, next) {
        res.json({
            message: 'Hello World 2'
        });
    }
    /**
     * GET one hero by id
     */
    getOne(req, res, next) {
        let query = parseInt(req.params.id);
        let hero = {
            "id": 1,
            "name": "Luke Cage",
            "aliases": ["Carl Lucas", "Power Man", "Mr. Bulletproof", "Hero for Hire"],
            "occupation": "bartender",
            "gender": "male",
            "height": {
                "ft": 6,
                "in": 3
            },
            "hair": "bald",
            "eyes": "brown",
            "powers": [
                "strength",
                "durability",
                "healing"
            ]
        };
        if (hero) {
            res.status(200)
                .send({
                message: 'Success',
                status: res.status,
                hero
            });
        }
        else {
            res.status(404)
                .send({
                message: 'No hero found with the given id.',
                status: res.status
            });
        }
    }
    /*
    * Take each handler, and attah to one of the Express.Router's endpoints
    */
    init() {
        this.router.get('/', this.getAll);
    }
}
exports.HeroRouter = HeroRouter;
// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new HeroRouter();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = heroRoutes.router;
