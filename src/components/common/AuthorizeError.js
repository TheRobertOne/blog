/**
 * Created by guofe on 2016/5/31.
 */

import { Modal } from 'antd';
import {
    action_login_modal_visible,

} from "../../actions/loginAction";

import store from "../../reduxConfig/store";

const confirm = Modal.confirm;

export default class AuthorizeError {
    constructor(response) {
        this.response = response;

        if (response.url.indexOf('logout') > 0) {
            return;
        }

        if (window.localStorage) {
            window.localStorage.removeItem('_TOKEN_');
        }

        store.dispatch(action_login_modal_visible(true));
        
        
    }
}

AuthorizeError.status = 401;
