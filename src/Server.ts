import cookieParser from 'cookie-parser';
import session from 'express-session';
import express from 'express';
import { Request, Response } from 'express';
import logger from 'morgan';
import path from 'path';
import favicon from 'serve-favicon';
import { NextFunction } from 'connect';
import { ResponseError } from 'superagent';
import uuid from 'uuid';
import "reflect-metadata";
import { createConnection, UpdateQueryBuilder } from 'typeorm';
import {AppGetRoutes, AppPostRoutes} from "./routing/routes";

import minify from 'express-minify';
import uglifyEs from 'uglify-es';

import mcache from 'memory-cache';

var cache = (duration: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        var key = '__express__' + req.originalUrl || req.url;
        var cachedBody = mcache.get(key);
        if (cachedBody) {
            res.send(cachedBody);
            return;
        } else {
            //@ts-ignore
            res.sendResponse = res.send
            //@ts-ignore
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                //@ts-ignore
                res.sendResponse(body)
            }
            next()
        }
    }
}

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection().then(async connection => {

    // create express app
    const app = express();
    
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(session({
        secret: uuid.v4(),
        resave: false,
        saveUninitialized: true,
        // @todo set secure true before deploy
        cookie: { secure: false }
    }))
    //@ts-ignore
    app.use(minify({cache: true, uglifyJsModule: uglifyEs}));
    app.use(express.static(path.join(__dirname, 'public')));

    /**
     * Point express to the 'views' directory. If you're using a
     * single-page-application framework like react or angular
     * which has its own development server, you might want to
     * configure this to only serve the index file while in
     * production mode.
     */
    const viewsDir = path.join(__dirname, 'views');
    app.set('views', viewsDir);
    app.set('view engine', 'ejs');
    const staticDir = path.join(__dirname, 'public');

    app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')));

    app.use(express.static(staticDir));

    // register all get application routes
    AppGetRoutes.routes.forEach(route => {
        app.get(route.path, cache(route.cache), (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch((err: any) => next(err));
        });
    });

    // register all application routes
    AppPostRoutes.routes.forEach(route => {
        app.post(route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch((err: any) => next(err));
        });
    });

    // Error Routes
    // catch 404 and forward to error handler
    app.use(function(req, res) {
        const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        const page = "../content/static/404";
        const altTag = req.get('host');
    
        res.removeHeader('content-type');
        res.render('templates/default', { page: page, altTag: altTag, baseUrl: baseUrl});
    });

    // error handler
    // noinspection JSUnusedLocalSymbols
    app.use(function(err: ResponseError, req: Request, res: Response, next: NextFunction) {
        console.log(err);

        res.removeHeader('content-type');
        const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        const page = "../content/static/404";
        const altTag = req.get('host');
    
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(err.status || 404);
        //res.render('error');
        res.render('templates/default', { page: page, altTag: altTag, baseUrl: baseUrl});
    });

    // run app
    app.listen(3000);

    console.log("Server started!");

}).catch(error => console.log("TypeORM connection error: ", error));
