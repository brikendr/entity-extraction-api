"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express_1 = require('express');
const Standord = require('stanford-ner');
const ner = new Standord.NER();
class EntityExtractor {
    /*
     *  Initialize the HeroRouter
     * */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * POST method that gets the contentText as a parameter and using the stanford NER it extracts all entities and
     * returns a JSON object populated with the corresponding entities.
     */
    extractEntities(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let textContent = req.query.textContent;
            if (textContent != null && textContent != "") {
                let taggedData = yield ner.getEntities(textContent);
                var organization = [], location = [], person = [];
                for (var i = 0, len = taggedData.length; i < len; i++) {
                    var map = taggedData[i];
                    if (map.get("ORGANIZATION") && map.get("ORGANIZATION").length > 0) {
                        organization.push(...map.get("ORGANIZATION"));
                    }
                    if (map.get("LOCATION") && map.get("LOCATION").length > 0) {
                        location.push(...map.get("LOCATION"));
                    }
                    if (map.get("PERSON") && map.get("PERSON").length > 0) {
                        person.push(...map.get("PERSON"));
                    }
                }
                var entities = {
                    'Organization': organization,
                    'Location': location,
                    'Person': person
                };
                res.status(200)
                    .send({
                    message: 'Success',
                    status: res.status,
                    entities
                });
            }
            else {
                res.status(400)
                    .send({
                    message: 'The parameter \'textContent\' cannot be empty!',
                    status: res.status
                });
            }
        });
    }
    /**
     * Take each handler, and attach to one of the Express.Router's endpoints.
     */
    init() {
        this.router.post('/tag', this.extractEntities);
    }
}
exports.EntityExtractor = EntityExtractor;
// Create the EntiyExtractor, and export its configured Express.Router
const entityExtractor = new EntityExtractor();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = entityExtractor.router;
