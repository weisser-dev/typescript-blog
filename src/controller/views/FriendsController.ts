import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Friend} from "../../entity/Friend";

/**
 * Loads all friends from the database.
 */
export async function showFriends(req: Request, res: Response) {

    // get a friend repository to perform operations with post
    const friendRepository = getManager().getRepository(Friend);
    const pageUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // load all friends
    const friends = await friendRepository.find();
    // return loaded friends
    res.render('templates/default', {page: '../content/friends', 
    pageUrl: pageUrl, 
    id: 'friends', 
    data: friends, 
    tags: ""}); 
}