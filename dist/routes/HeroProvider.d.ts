/// <reference types="express" />
import { Router, Request, Response, NextFunction } from 'express';
export declare class HeroProvider {
    router: Router;
    /**
     * Initialize the HeroRouter
     */
    constructor();
    /**
     * GET all Heroes.
     */
    getAll(req: Request, res: Response, next: NextFunction): void;
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init(): void;
}
declare var _default: Router;
export default _default;
