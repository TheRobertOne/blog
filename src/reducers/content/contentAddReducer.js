

export function reducer_contentAdd(state={
    fileList:[
        // {uid:-1,
        // url:"http://192.168.21.55:8080/icon/豌豆荚.ico",
        // name:"test",}
    ],
    file:{},
    spinning:false,
    previewVisible:false,
    previewImage:""
},action){
    switch (action.type){
        case "CONTENT_ADD_SPINNING":
            return Object.assign({},state,{
                spinning:action.payload
            });
        case "CONTENT_ADD_PARSEAPK":
            //action.payload.url = "http://192.168.21.55:8080"+action.payload.url;
            action.payload.uid = -1;
            let arr = [].concat(action.payload);
            console.log(arr);
            return Object.assign({},state,{
                fileList:arr
            });
        case "CONTENT_ADD_UPDATE_FILELIST":
            return Object.assign({},state,{file:action.payload});
        case "CONTENT_ADD_PREVIEWVISIBLE":
             return Object.assign({},state,{
                 previewVisible:action.payload
             });
        case "CONTENT_ADD_PREVIEWIMAGE":
             return Object.assign({},state,{
                 previewImage:action.payload
             });
        case "CONTENT_ADD_CLEARALL":
            return Object.assign({},state,{
                fileList:[]
            },{
               file:{} 
            })
        default:
            return state;
    }
}

// {
//         uid: -1,
//         name: '111.apk',
//         //status: 'done',
//         //url: 'http://www.baidu.com/111.apk',
//       }