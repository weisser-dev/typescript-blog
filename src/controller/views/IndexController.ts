import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Article} from "../../entity/Article";

const moment = require('moment');

/**
 * Loads all articles from the database.
 */
export async function showIndex(req: Request, res: Response) {

    // get a article repository to perform operations with post
    const articleRepository = getManager().getRepository(Article);
    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const altTag = req.get('host');
    // load all articles
    //const articles = await articleRepository.find();

    const articles = await articleRepository.createQueryBuilder("article") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
    .where("article.visible = 0")
    .orderBy("article.time", "DESC")
    .skip(0)
    //.take(9)
    .getMany();
    
   

    // return loaded articles
    //res.send(articles);
    res.render('templates/default', {page: '../content/index', 
        baseUrl: baseUrl, 
        id: 'index', 
        data: articles, 
        tags: "", 
        filter: "",
        easterEgg: "", 
        altTag: altTag,
        moment: moment
    });
}