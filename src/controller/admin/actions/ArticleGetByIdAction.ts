import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Article} from "../../../entity/Article";

/**
 * Loads article by a given id.
 */
export async function articleGetByIdAction(request: Request, response: Response) {

    // get a article repository to perform operations with article
    const articleRepository = getManager().getRepository(Article);

    // load a article by a given article id
    const article = await articleRepository.findOne(request.params.id);

    // if article was not found return 404 to the client
    if (!article) {
        response.status(404);
        response.end();
        return;
    }

    // return loaded article
    response.send(article);
}
