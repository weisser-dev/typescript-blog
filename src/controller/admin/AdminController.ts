// GET route after registering
import {Request, Response, NextFunction} from "express";
import {getManager} from "typeorm";
import { User } from 'src/entity/User';
import { Article } from 'src/entity/Article';
import { Friend } from 'src/entity/Friend';
import { Role } from 'src/entity/Role';

/**
 * Loads all friends from the database.
 */
export async function showAdmin(req: Request, res: Response, next: NextFunction) {
  const userRepository = getManager().getRepository(User);
  const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const altTag = req.get('host');
    
  // load a article by a given article id  
  if(req.session && req.session.userId) {
    const user= await userRepository.findOne(req.session.userId, { relations: ["role"] });
     // if article was not found return 404 to the client
    if (!user) {
      var err = new Error('Not authorized! Go back!');
      res.status(400);
      return next(err);
    }  
    const articleRepository = getManager().getRepository(Article);
    const friendsRepository = getManager().getRepository(Friend);
    const roleRepository = getManager().getRepository(Role);

    const articles = await articleRepository.createQueryBuilder("article") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
    .orderBy("article.time", "DESC")
    .getMany();
    
    return res.render('templates/default', {page: '../admin/overview', 
    baseUrl: baseUrl, 
    articles: articles,
    altTag: altTag,
    tags: ""}); 

  } else {
    res.render('templates/default', {page: '../admin/login', 
    baseUrl: baseUrl, 
    altTag: altTag,
    tags: ""}); 
  }
}