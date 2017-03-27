import {combineReducers} from "redux";
import {reducer_contentList} from "./contentListReducer";
import {reducer_contentAdd} from "./contentAddReducer";
import {reducer_contentBanner} from "./contentBannerReducer";
import {reducer_contentEdit} from "./contentEditReducer";
import {reducer_contentAddBanner} from "./contentAddBannerReducer";
export default combineReducers({
    contentList:reducer_contentList,
    contentAdd:reducer_contentAdd,
    contentBanner:reducer_contentBanner,
    contentBannerAdd:reducer_contentAddBanner,
    contentEdit:reducer_contentEdit
});