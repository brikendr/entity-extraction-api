/// <reference types="express" />
import { Router, Request, Response, NextFunction } from 'express';
export declare class EntityExtractor {
    router: Router;
    constructor();
    /**
     * POST method that gets the contentText as a parameter and using the stanford NER it extracts all entities and
     * returns a JSON object populated with the corresponding entities.
     */
    extractEntities(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Take each handler, and attach to one of the Express.Router's endpoints.
     */
    init(): void;
}
declare var _default: Router;
export default _default;
