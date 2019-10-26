import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Friend} from "../../../entity/Friend";

/**
 * Loads all friends from the database.
 */
export async function friendsGetAllAction(request: Request, response: Response) {

    // get a friend repository to perform operations with post
    const friendRepository = getManager().getRepository(Friend);

    // load all friends
    const friends = await friendRepository.find();

    // return loaded friends
    response.send(friends);
}