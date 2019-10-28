import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Article} from "../../../entity/Article";

const moment = require('moment');

/**
 * Saves given article.
 */
export async function articleUpdateAction(req: Request, res: Response) {

    // get a article repository to perform operations with article
    const articleRepository = getManager().getRepository(Article);
    var article;
    var articles; 
    if(req.body && req.session && req.session.userId) {
        if(req.body.updateArticle) {
            articles = await articleRepository.find();
            articles.forEach((currentArticle: Article) => {
                if(currentArticle.id === req.body.id) {
                    article = currentArticle;
                }
            });
        } else {
            article = articleRepository.create();
            article.id = req.body.id;
            article.time = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        }
    
        if(article) {
            article.content = req.body.content;
            if(req.body.visible === "true") {
                article.visible = true;
            } else {
                article.visible = false;
            }
            article.title = req.body.title;
            article.description = req.body.description;
            article.tags = req.body.tags;
            await articleRepository.save(article);
        }    
    }
    
    res.redirect("/admin");
}