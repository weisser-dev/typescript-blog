import {IAppRoutes} from './interfaces/IAppRoutes';
import {articleUpdateAction, articleExportAction, articleDownloadAction} from "../controller/admin/actions/ArticleActionController";
import {showArticleById, editArticle, showArticles} from "../controller/views/ArticleController";
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
        action: showIndex,
        cache: 1
    },
    {
        path: "/archive",
        action: showArticles,
        cache: 1
    },{
        path: "/articles",
        action: showIndex,
        cache: 1
    },
    {
        path: "/articles/:id",
        action: showArticleById,
        cache: 100
    },
    {
        path: "/amp/:id",
        action: showArticleById,
        cache: 1000
    },
    {
        path: "/amp/articles/:id",
        action: showArticleById,
        cache: 1000
    },
    {
        path: "/friends",
        action: showFriends,
        cache: 1000
    },
    {
        path: "/static/:id",
        action: showStaticContent,
        cache: 1000
    }, 
    {
        path: "/admin",
        action: showAdmin,
        cache: 1
    },     
    {
        path: "/admin/login",
        action: showAdmin,
        cache: 1
    },     
    {
        path: "/admin/editArticle/:id",
        action: editArticle,
        cache: 1
    },     
    {
        path: "/admin/addArticle",
        action: editArticle,
        cache:1
    },  
    {
        path: "/logout",
        action: doLogoutAction,
        cache: 1
    },
    {
        path: "/:feed",
        action: showFeed,
        cache: 1000
    }  
]};

/**
 * All application routes.
 */
export const AppPostRoutes: IAppRoutes = { "routes":[
    {
        path: "/",
        action: showIndex,
        cache: 100
    },
    {
        path: "/updateArticle",
        action: articleUpdateAction,
        cache: 1
    },
    {
        path: "/admin/exportArticle/:id",
        action: articleExportAction,
        cache: 1
    },
    {
        path: "/admin/downloadArticle/:id",
        action: articleDownloadAction,
        cache: 1
    },
    {
        path: "/admin/login",
        action: doLoginAction,
        cache: 1
    }
]};