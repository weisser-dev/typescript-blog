import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Article} from "../../entity/Article";
import {readingTime} from "reading-time";
 

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

    const stats = readingTime(article.content);
    const md = new markdown();
    article.content = md.render(article.content);

    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const altTag = req.get('host');
    // render ejs with loaded articled
    var amp = false;
    if(req.path.includes("/amp/")) {
        amp = true;
        article.content = article.content.replace(new RegExp('<img', 'g'), "<amp-img width='200px' height='150px' layout='responsive'");
    }
    res.render('templates/default', {
        page: 'static',
        amp: amp,
        baseUrl: baseUrl,
        readingTime: stats,
        params: req.query,
        data: article,
        altTag: altTag,
        filter: "",
        tags: "",
        moment: moment
    });
}

export async function showArticles(req: Request, res: Response) {

    // get a article repository to perform operations with post
    const articleRepository = getManager().getRepository(Article);
    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const altTag = req.get('host');
    
    // load all articles
    const articles = await articleRepository.createQueryBuilder("article") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
    .where("article.visible = true")
    .orderBy("article.time", "DESC")
    .skip(0)
    //.take(9)
    .getMany();
    
    // return loaded articles
    res.render('templates/default', {page: 'articles', 
        baseUrl: baseUrl, 
        data: articles, 
        amp: false,
        tags: "", 
        filter: "",
        easterEgg: "", 
        altTag: altTag,
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
            amp: false,
            article: article,
            altTag: altTag,
            filter: "",
            tags: "",
            moment: moment
        });
    }else {
        res.render('templates/default', {page: '../admin/login', 
        baseUrl: baseUrl, 
        amp: false,
        altTag: altTag,
        tags: ""}); 
      }
}
