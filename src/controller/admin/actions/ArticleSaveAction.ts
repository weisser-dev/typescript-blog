import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Article} from "../../../entity/Article";

/**
 * Saves given article.
 */
export async function articleSaveAction(request: Request, response: Response) {

    // get a article repository to perform operations with article
    const articleRepository = getManager().getRepository(Article);

    // create a real article object from article json object sent over http
    const newArticle = articleRepository.create(request.body);

    // save received article
    await articleRepository.save(newArticle);

    // return saved article back
    response.send(newArticle);
}