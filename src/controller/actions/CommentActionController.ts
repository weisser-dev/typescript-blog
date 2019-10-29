import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Comment} from "../../entity/Comment";

const moment = require('moment');

/**
 * Saves given article.
 */
export async function commentCreatedAction(req: Request, res: Response) {
    //@ts-ignore
    if (!req.recaptcha.error) {
        const commentRepository = getManager().getRepository(Comment);
        var comment: Comment = commentRepository.create();
        comment.articleId = req.params.id;
        comment.author = escape(req.body.author);
        comment.content = escape(req.body.content);
        comment.email = escape(req.body.email);
        comment.time = new Date().toDateString();
        if(comment.content.includes("http")) {
            comment.visible = false;
        } else {
            comment.visible = true;
        }
        await commentRepository.save(comment);
    
        // success code
    } else {
    // error code
        return res.redirect("/article/" + req.body.id + "?captchaInvalid");
    }

}
