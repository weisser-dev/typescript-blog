import {IAppRoutes} from './interfaces/IAppRoutes';
import {articleUpdateAction} from "../controller/admin/actions/ArticleSaveAction";
import {showArticleById, editArticle} from "../controller/views/ArticleController";
import {showFriends} from '../controller/views/FriendsController';
import {showIndex} from "../controller/views/IndexController";
import {showStaticContent} from "../controller/views/StaticContentController";
import {showFeed} from 'src/controller/views/FeedsController';
import {doLoginAction, doLogoutAction} from 'src/controller/admin/actions/AuthActionController';
import {showAdmin} from 'src/controller/admin/AdminController';

/**
 * All application routes.
 */
export const AppGetRoutes: IAppRoutes = { "routes":[
    {
        path: "/",
        action: showIndex
    },
    {
        path: "/articles/:id",
        action: showArticleById
    },
    {
        path: "/friends",
        action: showFriends
    },
    {
        path: "/static/:id",
        action: showStaticContent
    }, 
    {
        path: "/admin",
        action: showAdmin
    },     
    {
        path: "/admin/editArticle/:id",
        action: editArticle
    },     
    {
        path: "/admin/addArticle",
        action: editArticle
    },  
    {
        path: "/logout",
        action: doLogoutAction
    },
    {
        path: "/:feed",
        action: showFeed
    }  
]};

/**
 * All application routes.
 */
export const AppPostRoutes: IAppRoutes = { "routes":[
    {
        path: "/",
        action: showIndex
    },
    {
        path: "/updateArticle",
        action: articleUpdateAction
    },
    {
        path: "/login",
        action: doLoginAction
    }
]};