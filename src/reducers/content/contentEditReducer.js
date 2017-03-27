

export function reducer_contentEdit(state={
    spinning:false,
    APPList:[],
    delElement:{}
},action){
    switch (action.type){
        case "CONTENT_EDIT_GETLIST":
            return Object.assign({},state,{
                APPList:action.payload
            });
        case "CONTENT_EDIT_SPINNING":
            return Object.assign({},state,{
                spinning:action.payload
            });
        case "CONTENT_EDIT_DEL":
            let obj = {};
            obj.id=action.payload.id;
            //obj.flag=action.payload.flag;
            console.log(obj);
            return Object.assign({},state,{
                delElement:obj
            });
        case "CONTENT_EDIT_DELCONFIRM":
            let arr = [].concat(state.APPList);
            for(let i =0;i<arr.length;i++){
                if(arr[i].id == state.delElement.id){
                    arr[i].deleteFlag = 1
                }
            }
            console.log(arr);

            return Object.assign({},state,{
                APPList:arr
            });
        case "CONTENT_EDIT_CLEARALL":
            return Object.assign({},state,{
                APPList:[]
            })
        default:
            return state;
    }
}

