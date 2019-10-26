import {IAppRoutes} from './interfaces/IAppRoutes';
import {articleSaveAction} from "../controller/admin/actions/ArticleSaveAction";
import {showArticleById} from "../controller/views/ArticleController";
import {showFriends} from '..//controller/views/FriendsController';
import {showIndex} from "../controller/views/IndexController";
import {showStaticContent} from "../controller/views/StaticContentController";
import { showSitemap, showRss } from 'src/controller/views/FeedsController';

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
        path: "/sitemap.xml",
        action: showSitemap
    },
    {
        path: "/rss.xml",
        action: showRss
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
        path: "/article/:id",
        action: showArticleById
    },
    {
        path: "/posts",
        action: articleSaveAction
    }
]};