import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Article} from "../../entity/Article";

//legacy shit
const moment = require('moment');

/**
 * Loads article by a given id.
 */
export async function showFeed(req: Request, res: Response) {

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
    var feedTemplate: string = req.params.feed;
    feedTemplate = feedTemplate.replace('.xml', '');
    console.log(feedTemplate);
    res.render('feeds/' + feedTemplate, {
        baseUrl: baseUrl,
        articles: articles,
        moment: moment
    })
}