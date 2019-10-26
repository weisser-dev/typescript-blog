import cookieParser from 'cookie-parser';
import express from 'express';
import { Request, Response } from 'express';
import logger from 'morgan';
import path from 'path';
import favicon from 'serve-favicon';
import { NextFunction } from 'connect';
import { ResponseError } from 'superagent';

import "reflect-metadata";
import { createConnection } from 'typeorm';

import {AppGetRoutes, AppPostRoutes} from "./routing/routes";



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
        app.get(route.path, (request: Request, response: Response, next: Function) => {
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
        let pageUrl = "http://www.whit-e.com" + req.originalUrl;
        let page = "../content/static/404";
        res.render('templates/default', { page: page, pageUrl: pageUrl});
    });

    // error handler
    // noinspection JSUnusedLocalSymbols
    app.use(function(err: ResponseError, req: Request, res: Response, next: NextFunction) {
        console.log(err);
        let pageUrl = "http://www.whit-e.com" + req.originalUrl;
        let page = "../content/static/404";
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(err.status || 404);
        //res.render('error');
        res.render('templates/default', { page: page, pageUrl: pageUrl});
    });

    // run app
    app.listen(3000);

    console.log("Express application is up and running on port 3000");

}).catch(error => console.log("TypeORM connection error: ", error));
