import {Router, Request, Response, NextFunction} from 'express';
import * as Standord from 'stanford-ner';

const ner = new Standord.NER();

export class EntityExtractor {
    router: Router
    /*
     *  Initialize the HeroRouter
     * */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * POST method that gets the contentText as a parameter and using the stanford NER it extracts all entities and
     * returns a JSON object populated with the corresponding entities.
     */
    public async extractEntities(req: Request, res: Response, next: NextFunction) {
        let textContent = req.query.textContent;

        if(textContent != null && textContent != "") {
            let taggedData = await ner.getEntities(textContent);
            var organization : Object[] = [],
                location : Object[] = [],
                person : Object[] = [];

            for (var i = 0, len = taggedData.length; i < len; i++) {
                var map = taggedData[i];
                if(map.get("ORGANIZATION") && map.get("ORGANIZATION").length > 0) {
                    organization.push(...map.get("ORGANIZATION"));
                }

                if(map.get("LOCATION") && map.get("LOCATION").length > 0) {
                    location.push(...map.get("LOCATION"));
                }

                if(map.get("PERSON") && map.get("PERSON").length > 0) {
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
        } else {
            res.status(400)
                .send({
                    message: 'The parameter \'textContent\' cannot be empty!',
                    status: res.status
                });
        }
    }

    /**
     * Take each handler, and attach to one of the Express.Router's endpoints.
     */
    init() {
        this.router.post('/tag', this.extractEntities)
    }
}

// Create the EntiyExtractor, and export its configured Express.Router
const entityExtractor = new EntityExtractor();

export default entityExtractor.router;