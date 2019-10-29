import {Request, Response} from "express";

export function showStaticContent(req: Request, res: Response) {

    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const altTag = req.get('host');
    const page = '../content/static/' + req.params.id;
    res.render('templates/default', {page: page,
            baseUrl: baseUrl,
            params: req.query, 
            altTag: altTag,
            tags: ""});
}