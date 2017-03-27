import {combineReducers} from "redux";
import {reducer_linkClicks} from "./linkClicksReducer";
import {reducer_apkClicks} from "./apkClicksReducer";
import {reducer_bannerClicks} from "./bannerClicksReducer";
export default combineReducers({
    linkClicks:reducer_linkClicks,
    apkClicks:reducer_apkClicks,
    bannerClicks:reducer_bannerClicks  
});