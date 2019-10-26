import {Request, Response} from "express";

export function showStaticContent(req: Request, res: Response) {

    const pageUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const page = '../content/static/' + req.params.id;
    res.render('templates/default', {page: page,
            pageUrl: pageUrl,
            id: req.params.id, 
            params: req.query, 
            tags: ""});
}