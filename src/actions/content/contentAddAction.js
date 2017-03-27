import {getJson,postJson,postForm} from "../../utils/FetchUtil";
import {message} from "antd";

export function action_content_add_spinning(bol){
    return {
        type:"CONTENT_ADD_SPINNING",
        payload:bol
    }
}

export function action_content_add_update_fileList(fileList){
    return {
        type:"CONTENT_ADD_UPDATE_FILELIST",
        payload:fileList,
    }
}


export function action_content_add_submit(values){
    return (dispatch,getState) => {

        dispatch(action_content_add_spinning(true));
        const fileList = getState().content.contentAdd.fileList[0];
        values.name = getState().content.contentAdd.fileList[0].name;
        values.apk = getState().content.contentAdd.file;
        values.icon = getState().content.contentAdd.fileList[0].url;
        values.type = 2;       
        
        console.log(values);

        postForm("/app",values).then(res => {
            dispatch(action_content_add_spinning(false));
            dispatch(action_content_add_clearAll());
        }).catch(err => {
            dispatch(action_content_add_spinning(false));
            message.error(err.message);
        });


    }
}


export function action_content_add_parseApk(file){
    return (dispatch,getState) => {
        
        dispatch(action_content_add_spinning(true));

        dispatch(action_content_add_update_fileList(file));
         //let apk = file;
        //values.apk = getState().version.versionAdd.fileList[0];  
        postForm(`/app/parseApk`,{"apk":file}).then(res => {
            //console.log(res);
            dispatch({
                type:"CONTENT_ADD_PARSEAPK",
                payload:res
            })
            dispatch(action_content_add_spinning(false));
        }).catch(err => {
            dispatch(action_content_add_spinning(false));
            message.error(err.message);
        });
    }
}

/**
 * 改变modal的visible
 */
export function action_content_add_previewVisible(bol){
    return {
        type:"CONTENT_ADD_PREVIEWVISIBLE",
        payload:bol
    }
}
/**
 * 改变modal的imageUrl
 */
export function action_content_add_previewImage(url){
    return {
        type:"CONTENT_ADD_PREVIEWIMAGE",
        payload:url
    }
}


//清空
export function action_content_add_clearAll(){
    return {
        type:"CONTENT_ADD_CLEARALL"
    }
}