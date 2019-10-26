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
export async function showSitemap(req: Request, res: Response) {

     // get a article repository to perform operations with post
     const articleRepository = getManager().getRepository(Article);
     // load all articles
     //const articles = await articleRepository.find();
 
     const articles = await articleRepository.createQueryBuilder("article") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
     .where("article.visible = 0")
     .orderBy("article.time", "DESC")
     .getMany();

    const baseUrl = req.protocol + '://' + req.get('host');
    // render ejs with loaded article

    res.setHeader('content-type', 'text/xml');
    res.render('feeds/sitemap', {
        baseUrl: baseUrl,
        articles: articles,
        moment: moment
    })
}


export async function showRss(req: Request, res: Response) {

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

    const pageUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // render ejs with loaded article
    res.setHeader('content-type', 'text/xml');
    res.render('templates/default', {
        page: "static",
        pageUrl: pageUrl,
        id: req.params.dynamicroute,
        params: req.query,
        data: article,
        filter: "",
        tags: "",
        moment: moment
    });
}

