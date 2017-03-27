import {getJson,postJson,postForm} from "../../utils/FetchUtil";
import {message} from "antd";

export function action_content_banner_spinning(bol){
    return {
        type:"CONTENT_BANNER_SPINNING",
        payload:bol
    }
}

export function action_content_banner_fileList(fileList){
    return {
        type:"CONTENT_BANNER_FILELIST",
        payload:fileList,
    }
}

export function action_content_banner_submit(arr){
    return (dispatch,getState) => {
        dispatch(action_content_banner_spinning(true));
        //console.log("submit里面的arr",arr);
        postJson("/banner/editBanner",arr).then(res => {
            dispatch(action_content_banner_spinning(false));
            //不刷新页面无法重新排序
            location.reload();
        }).catch(err => {
            dispatch(action_content_banner_spinning(false));
            message.error(err.message);
        });
    }
}

export function action_content_banner_del(id){
    return {
        type:"CONTENT_BANNER_DEL",
        payload:{
            id
        }
    }
}

export function action_content_banner_delConfirm(){
    return (dispatch,getState) => {
        dispatch({
            type:"CONTENT_BANNER_DELCONFIRM",
            //payload:bol
        });
        let arr = getState().content.contentBanner.bannerList;
        console.log("arr",arr);
        let arr2 = [];
        for(let i = 0;i < arr.length; i++){
            arr2.push({"id":arr[i].id,"deleteFlag":arr[i].deleteFlag,"seq":arr[i].seq});
        }
        console.log("arr2",arr2);
        dispatch(action_content_banner_submit(arr2));
        //dispatch(action_content_edit()); 
    }
}

export function action_content_banner_edit(){
    return (dispatch,getState) => {
        dispatch(action_content_banner_spinning(true));
        getJson('/banner').then(res => {
            console.log("res1",res);
            dispatch({
                type: "CONTENT_BANNER_GETLIST",
                payload: res
            });
            // for(let i = 0;i < res.length;i++){
            //     getJson(`/images/urls?imgNames=${res[0].image}`).then(res2 =>{
            //         console.log("res2",res2);
            //         dispatch({
            //             type: "CONTENT_BANNER_URL",
            //             payload: res2.url
            //         });
            //     })
            // }

            dispatch(action_content_banner_spinning(false));
        }).catch(err => {
            message.error(err.message);
            dispatch(action_content_banner_spinning(false));
        })
    }
}

//清空
export function action_content_banner_edit_clearAll(){
    return {
        type:"CONTENT_BANNER_EDIT_CLEARALL"
    }
}