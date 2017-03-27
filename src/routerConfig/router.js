import React from "react";
// browserHistory 是由 React Router 创建浏览器应用推荐的 history
import {browserHistory,hashHistory,Router,Route,IndexRoute,IndexRedirect} from "react-router";

//路由组件引入
import App from "../components/HeaderComponent";
//Content 军团
import ContentMenu from "../components/Content/ContentMenu";
//import ContentList from "../components/Content/ContentList";
import ContentAdd from "../components/Content/ContentAdd";
import ContentBanner from "../components/Content/ContentBanner";
import ContentEdit from "../components/Content/ContentEdit";
import ContentBannerAdd from "../components/Content/ContentBannerAdd";
//Data 军团
import DataMenu from "../components/Data/DataMenu";
import LinkClicks from "../components/Data/LinkClicks";
import ApkClicks from "../components/Data/ApkClicks";
import BannerClicks from "../components/Data/BannerClicks";



export default (
            <Route path="/" component={App}>
                <IndexRedirect to="/DataMenu/LinkClicks" />
                <Route path="/ContentMenu" component={ContentMenu} >
                    <IndexRoute component={ContentBanner} />
                    <Route path="/ContentMenu/ContentAdd" component={ContentAdd} />
                    <Route path="/ContentMenu/ContentBanner" component={ContentBanner} />
                    <Route path="/ContentMenu/ContentEdit(/:id)" component={ContentEdit} />
                    <Route path="/ContentMenu/ContentBannerAdd" component={ContentBannerAdd} />
                </Route>
                <Route path="/DataMenu" component={DataMenu} >
                    <IndexRoute component={LinkClicks} />
                    <Route path="/DataMenu/LinkClicks" component={LinkClicks} />
                    <Route path="/DataMenu/ApkClicks" component={ApkClicks} />
                    <Route path="/DataMenu/BannerClicks" component={BannerClicks} />
                </Route>                
            </Route>      
)