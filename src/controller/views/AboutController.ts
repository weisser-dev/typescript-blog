import {Request, Response} from "express";
import {getManager} from "typeorm";

/**
 * Loads all friends from the database.
 */
export async function showAbout(req: Request, res: Response) {

    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const altTag = req.get('host');
    res.render('templates/default', {page: '../content/about', 
    baseUrl: baseUrl, 
    altTag: altTag}); 
}