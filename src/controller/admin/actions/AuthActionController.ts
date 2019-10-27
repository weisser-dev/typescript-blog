// GET route after registering
import {Request, Response, NextFunction} from "express";
import {getManager} from "typeorm";
import { User } from 'src/entity/User';
import crypto from 'crypto';

/**
 * Saves given article.
 */
export function doLogoutAction(req: Request, res: Response, next: NextFunction) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      }
    });
  }
  return res.redirect('/');
}

/**
 * Loads all friends from the database.
 */
export async function doLoginAction(req: Request, res: Response, next: NextFunction) {
  const userRepository = getManager().getRepository(User);
  const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const altTag = req.get('host');
  
  if (req.body.logemail && req.body.logpassword) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(req.body.logemail);
    if (!user) {
      return res.render('templates/default', {page: '../admin/login', 
      baseUrl: baseUrl, 
      altTag: altTag,
      errormsg: "Wrong Credentials - Try Again!",
      tags: ""}); 
    }

    var crypto = require('crypto');
    var password = crypto.createHash('md5').update(req.body.logpassword).digest("hex");
    var loginData = req.body.logemail + password;
    console.log(password);
    var userData = user.email + user.password;
    if(loginData === userData) {  
      if(req.session) {
        var hour = 3600000
        req.session.cookie.expires = new Date(Date.now() + hour)
        req.session.cookie.maxAge = hour
        req.session.userId = user.id;
        req.session.save(function(err) {
          if(!err) {
            return res.redirect('/admin');
          }
        })
      }
    } else {
      return res.render('templates/default', {page: '../admin/login', 
      baseUrl: baseUrl, 
      altTag: altTag,
      errormsg: "Wrong Credentials - Try Again!",
      tags: ""}); 
    }
  } else {
    return res.render('templates/default', {page: '../admin/login', 
    baseUrl: baseUrl, 
    altTag: altTag,
    errormsg: "All Fields Required - Try Again!",
    tags: ""}); 
  }
}


/**
 * Loads all friends from the database.
 */
export async function doRegisterAction(req: Request, res: Response, next: NextFunction) {

  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    res.status(400);
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }
    /*
        
    var crypto = require('crypto');
    crypto.createHash('md5').update(data).digest("hex");
    
    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

    */

  } else {
    var err = new Error('All fields required.');
    res.status(400);
    return next(err);
  }
}