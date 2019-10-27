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
    if(req.body && req.session && req.session.userId) {
        if(req.body.updateArticle) {
            article = await articleRepository.findOne(req.body.id);
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
                console.log("false");
                article.visible = false;
            }
            article.title = req.body.title;
            article.description = req.body.description;
            article.tags = req.body.tags;
            await articleRepository.save(article);
            console.log("article updated");
        }    
    }
    
    res.redirect("/admin");
}