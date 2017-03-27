
import {getJson,postJson,postForm} from "../../utils/FetchUtil";
import {message} from "antd";

export function action_content_edit(){
    return (dispatch,getState) => {
        dispatch(action_content_spinning(true));
        getJson('/app').then(res => {
            //console.log(res);
            dispatch({
                type: "CONTENT_EDIT_GETLIST",
                payload: res
            });
            dispatch(action_content_spinning(false));
        }).catch(err => {
            message.error(err.message);
            dispatch(action_content_spinning(false));
        })
    }
}

function action_content_spinning(bol){
    return {
        type:"CONTENT_EDIT_SPINNING",
        payload:bol
    }
}

export function action_content_submit(arr){
    return dispatch =>{
        dispatch(action_content_spinning(true));
        postJson('/app/editApp',arr).then(res => {
            //console.log(res);
            //dispatch(action_content_edit());
            //不刷新页面无法重新排序
            location.reload();

            dispatch(action_content_spinning(false));
        }).catch(err => {
            message.error(err.message);
            dispatch(action_content_spinning(false));
        })
    }
}

export function action_content_del(id){
    return {
        type:"CONTENT_EDIT_DEL",
        payload:{
            id
        }
    }
}

export function action_content_delConfirm(){
    return (dispatch,getState) => {
        dispatch({
            type:"CONTENT_EDIT_DELCONFIRM",
            //payload:bol
        });
        let arr = getState().content.contentEdit.APPList;
        dispatch(action_content_submit(arr));
        //dispatch(action_content_edit()); 
    }
}

//清空
export function action_content_edit_clearAll(){
    return {
        type:"CONTENT_EDIT_CLEARALL"
    }
}