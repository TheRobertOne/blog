import {getJson,postJson,postJsonForDownload} from "../../utils/FetchUtil";
import {message} from "antd";

//请求  list
export function action_data_apkClick_list() {
    return (dispatch, getState) => {
        const listData = getState().data.apkClicks;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(action_data_apkClick_loading(true));

        console.log("params为",params);

        getJson('/data/apkClick', params).then(res => {
            dispatch({
                type: "DATA_APKCLICKS_GETLIST",
                payload: res
            }) 
        }).catch(err => {
            message.error(err.message);
            dispatch(action_data_apkClick_loading(false));
        })
    }
}
//table 的 loading 
function action_data_apkClick_loading(bol){
    return {
        type:"DATA_APKCLICKS_LOADING",
        payload:bol
    }
}

//search 按钮 触发的 action
export function action_data_apkClick_search(searchItem){
    return dispatch => {
        dispatch({
            type:"DATA_APKCLICKS_SEARCH",
            payload:searchItem
        })
        dispatch(action_data_apkClick_list());
    }
}

//排序 分页 过滤时  先触发 修改 state ， 然后再 请求 list
export function action_data_apkClick_updateparams(pagination, filters, sorter){
    return dispatch => {
        dispatch({
            type:"DATA_APKCLICKS_UPDATEPARAMS",
            payload:{
               pagination,
               filters,
               sorter
            }
        })
        dispatch(action_data_apkClick_list());
    }
}

//table 里的选择 因为 选择 是不 跟 排序 分页 过滤 一起的
export function action_data_apkClick_onSelect(index,rows){
    return {
        type:"DATA_APKCLICKS_SELECT",
        payload:{
            index,
            rows
        }
    }
}




/**
 * 导出列表到excel
 * @param page
 * @param pageSize
 * @param titles
 */
export function action_data_apkClick_export(titles) {
    return (dispatch, getState) => {
        const listData = getState().data.apkClicks;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);
        console.log("title为：",titles);

        postJsonForDownload('/data/apkClick/export', {params, titles}, 'APK-Clicks.xlsx').catch(err => {
            message.error(err.message);
        });
    }

}