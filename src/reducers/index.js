import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import { reducer_login } from "./loginReducer";
import { reducer_address } from "./menuReducer";
//import {action_changeAddress, action_EssayList_initData} from "../actions";
import content_comb from "./content";
import data_comb from "./data";



export default combineReducers({
    content:content_comb,
    data:data_comb,
    login:reducer_login,
    address:reducer_address,
    routing:routerReducer
});