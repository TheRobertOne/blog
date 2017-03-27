import {getJson,postJson,postJsonForDownload} from "../../utils/FetchUtil";
import {message} from "antd";

//请求  list
//getJson('baseStats/actives', params)
export function action_content_list() {
    return (dispatch, getState) => {
        const listData = getState().content.contentList;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(action_content_list_loading(true));

        console.log("params为",params);

        getJson('/app', params).then(res => {
            dispatch({
                type: "CONTENT_GETLIST",
                payload: res
            }) 
        }).catch(err => {
            message.error(err.message);
            dispatch(action_content_list_loading(false));
        })
    }
}
//table 的 loading 
function action_content_list_loading(bol){
    return {
        type:"CONTENT_LIST_LOADING",
        payload:bol
    }
}

//排序 分页 过滤时  先触发 修改 state ， 然后再 请求 list
export function action_content_list_updateparams(pagination, filters, sorter){
    return dispatch => {
        dispatch({
            type:"CONTENT_LIST_UPDATEPARAMS",
            payload:{
               pagination,
               filters,
               sorter
            }
        })
        dispatch(action_content_list());
    }
}

//table 里的选择 因为 选择 是不 跟 排序 分页 过滤 一起的
export function action_content_list_onSelect(index,rows){
    return {
        type:"CONTENT_LIST_ONSELECT",
        payload:{
            index,
            rows
        }
    }
}

//search 按钮 触发的 action
export function action_content_list_search(searchItem){
    return dispatch => {
        dispatch({
            type:"CONTENT_LIST_SEARCH",
            payload:searchItem
        })
        dispatch(action_content_list());
    }
}

//postJsonForDownload('essaies/export/xlsx', {params, titles}, 'Essay List.xlsx');
/**
 * 导出列表到excel
 * @param page
 * @param pageSize
 * @param titles
 */
export function action_content_list_export(titles) {
    return (dispatch, getState) => {
        const listData = getState().data.activation;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);
        console.log("title为：",titles);

        postJsonForDownload('baseStats/actives/export', {params, titles}, '数据-激活.xlsx').catch(err => {
            message.error(err.message);
        });
    }

}