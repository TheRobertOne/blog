

export function reducer_contentBanner(state={
    spinning:false,
    bannerList:[],
    delElement:{}
},action){
    switch (action.type){
        case "CONTENT_BANNER_GETLIST":
            return Object.assign({},state,{
                bannerList:action.payload
            });
        case "CONTENT_BANNER_SPINNING":
            return Object.assign({},state,{
                spinning:action.payload
            });
        case "CONTENT_BANNER_DEL":
            let obj = {};
            obj.id=action.payload.id;
            //obj.flag=action.payload.flag;
            console.log(obj);
            return Object.assign({},state,{
                delElement:obj
            });
        case "CONTENT_BANNER_DELCONFIRM":
            let arr = [].concat(state.bannerList);
            for(let i =0;i<arr.length;i++){
                if(arr[i].id == state.delElement.id){
                    arr[i].deleteFlag = 1
                }
            }
            console.log(arr);
            return Object.assign({},state,{
                bannerList:arr
            });
        case "CONTENT_BANNER_EDIT_CLEARALL":
            return Object.assign({},state,{
                bannerList:[]
            })
        default:
            return state;
    }
}

