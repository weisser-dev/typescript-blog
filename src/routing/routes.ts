import {showArticleById} from "../controller/views/ArticleController";
import {articleSaveAction} from "../controller/admin/actions/ArticleSaveAction";
import {showIndex} from "../controller/views/IndexController";
import { IAppRoutes } from './interfaces/IAppRoutes';
import { showFriends } from 'src/controller/views/FriendsController';

/**
 * All application routes.
 */
export const AppGetRoutes: IAppRoutes = { "routes":[
    {
        path: "/articles/:id",
        action: showArticleById
    },
    {
        path: "/friends",
        action: showFriends
    },
    {
        path: "/",
        action: showIndex
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