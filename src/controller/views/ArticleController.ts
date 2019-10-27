import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Article} from "../../entity/Article";

//legacy shit
const markdown = require('markdown-it');
const md = new markdown();
const moment = require('moment');

/**
 * Loads article by a given id.
 */
export async function showArticleById(req: Request, res: Response) {

    // get a article repository to perform operations with article
    const articleRepository = getManager().getRepository(Article);

    // load a article by a given article id
    const article= await articleRepository.findOne(req.params.id);

    // if article was not found return 404 to the client
    if (!article) {
        res.status(404);
        res.end();
        return;
    }

    const md = new markdown();
    article.content = md.render(article.content);

    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const altTag = req.get('host');
    // render ejs with loaded article
    res.render('templates/default', {
        page: "static",
        baseUrl: baseUrl,
        params: req.query,
        data: article,
        altTag: altTag,
        filter: "",
        tags: "",
        moment: moment
    });
}

export async function editArticle(req: Request, res: Response) {

    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const altTag = req.get('host');
        
    // load a article by a given article id
    if(req.session && req.session.userId) {
        var article;
        if(req.params && req.params.id) {
            const articleRepository = getManager().getRepository(Article);
            article= await articleRepository.findOne(req.params.id);

        }

        // render ejs with loaded article
        res.render('templates/default', {
            page: "../admin/add",
            baseUrl: baseUrl,
            params: req.query,
            article: article,
            altTag: altTag,
            filter: "",
            tags: "",
            moment: moment
        });
    }else {
        res.render('templates/default', {page: '../admin/login', 
        baseUrl: baseUrl, 
        altTag: altTag,
        tags: ""}); 
      }
}
