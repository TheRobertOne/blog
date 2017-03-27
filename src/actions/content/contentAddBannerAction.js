import {getJson,postJson,postForm} from "../../utils/FetchUtil";
import {message} from "antd";

export function action_content_add_banner_spinning(bol){
    return {
        type:"CONTENT_ADD_BANNER_SPINNING",
        payload:bol
    }
}

export function action_content_add_banner_update_fileList(fileList){
    return {
        type:"CONTENT_ADD_BANNER_UPDATE_FILELIST",
        payload:fileList,
    }
}


export function action_content_add_banner_submit(values){
    return (dispatch,getState) => {

        dispatch(action_content_add_banner_spinning(true));
        const obj = getState().content.contentBannerAdd;
        //values.name = getState().content.contentAdd.fileList[0].name;
        values.image = obj.fileList[0];
        //values.icon = getState().content.contentAdd.fileList[0].url;
        //values.type = 2;       
        //values.appId = obj.APPList[0].id;
        
        console.log(values);

        postForm("/banner",values).then(res => {
            dispatch(action_content_add_banner_spinning(false));
        }).catch(err => {
            dispatch(action_content_add_banner_spinning(false));
            message.error(err.message);
        });


    }
}


export function action_content_add_banner_parseApk(file){
    return {
                type:"CONTENT_ADD_BANNER_PARSEAPK",
                payload:file     
        

        // dispatch(action_content_add_banner_spinning(true));

        // dispatch(action_content_add_banner_update_fileList(file));
        //  //let apk = file;
        // //values.apk = getState().version.versionAdd.fileList[0];  
        // postForm(`/app/parseApk`,{"apk":file}).then(res => {
        //     //console.log(res);
            // dispatch({
            //     type:"CONTENT_ADD_BANNER_PARSEAPK",
            //     payload:res
            // })
        //     dispatch(action_content_add_banner_spinning(false));
        // }).catch(err => {
        //     dispatch(action_content_add_banner_spinning(false));
        //     message.error(err.message);
        // });


    }
}

/**
 * 改变modal的visible
 */
export function action_content_add_banner_previewVisible(bol){
    return {
        type:"CONTENT_ADD_BANNER_PREVIEWVISIBLE",
        payload:bol
    }
}
/**
 * 改变modal的imageUrl
 */
export function action_content_add_banner_previewImage(url){
    return {
        type:"CONTENT_ADD_BANNER_PREVIEWIMAGE",
        payload:url
    }
}


export function action_content_banner_getApp(){
    return (dispatch,getState) => {
        dispatch(action_content_add_banner_spinning(true));
        getJson('/app').then(res => {
            //console.log(res);
            dispatch({
                type: "CONTENT_ADD_BANNER_GETAPP",
                payload: res
            });
            dispatch(action_content_add_banner_spinning(false));
        }).catch(err => {
            message.error(err.message);
            dispatch(action_content_add_banner_spinning(false));
        })
    }
}

//清空
export function action_content_add_banner_clearAll(){
    return {
        type:"CONTENT_ADD_BANNER_CLEARALL"
    }
}