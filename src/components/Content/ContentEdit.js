import { move,getPos } from "../common/move";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

//import "../../less/contentBanner.less";
import "../../less/contentEdit.less";
import{
    Button,Select,Popconfirm,Spin
} from "antd";
import {
	action_content_edit,
	action_content_submit,
	action_content_del,
	action_content_delConfirm,
	action_content_edit_clearAll

} from "../../actions/content/contentEditAction";
const Option = Select.Option;


class ContentEdit extends React.Component{
    componentDidMount(){
        console.log("进入 ContentEdit 组件 ",this.props);
        this.forceUpdate();
		this.props.getList();
		//drag_yf();
    }
    componentWillReceiveProps(){
		this.forceUpdate();
		drag_yf();	
	}
	componentWillUnmount(){
    	this.props.onClear();
  	}
    render(){
        //const arr = [1,2,3,4];
        const {listData,onSubmit,onDelete,onConfirm} = this.props;
        return(<Spin spinning={listData.spinning}>
            <Button 
                type="primary"
                size="large"
                style={{margin:"15px 0 0 15px"}}
                onClick={e => {
                    //console.log(document.getElementById("ul_app").children.length);
					const ul_app =  document.getElementById("ul_app").children;
					let arr = [];
					for(let i = 0;i<ul_app.length;i++){
						//left.push(ul_app[i].style.left);
						arr.push({
							"id":ul_app[i].dataset.id,
							"deleteFlag":ul_app[i].dataset.flag,
							"seq":getPos(ul_app[i]).top*10000 + getPos(ul_app[i]).left
						});
					}	
					arr.sort(function(a,b){
						return a.seq - b.seq;
					})
					console.log("排序后的",arr);
					this.forceUpdate();
					onSubmit(arr);
			
                }}
            >SUBMIT</Button>
						<Button 
                type="primary"
                size="large"
                style={{margin:"15px 0 0 15px"}}
                //onClick={e => {
									
                    //console.log(document.getElementById("ul_app").children.length);
                //}}
            >
								<Link to="/ContentMenu/ContentAdd">添加APK</Link>
						</Button>

            <ul id="ul_app">
              {
                listData.APPList.map((item,index) => {
					//let icon = "http://192.168.21.55:8080"+item.icon;
                  return (
                    <li key={index} data-flag={item.deleteFlag} data-id={item.id} data-seq={item.seq} >
                      <Popconfirm title="Are you sure delete this APP?" 
					  	//visible={listData.PopconfirmVisible} 
						onConfirm={e => {
							//this.forceUpdate();
							onConfirm();
							//const _this = this;
							
						}}>
                        <span 
							className="ant-modal-close-x" 
							style={{
								position: "absolute",
								top:'0px', 
								right:'0px',
								fontWeight:"bold"
							}} 
							onClick={e => {
								console.log(e.target.parentNode)
								//onVisible(true);
								let id = e.target.parentNode.dataset.id;
								//let flag = e.target.parentNode.dataset.flag;
								onDelete(id);
							}} >
						</span>                
                      </Popconfirm>
					  {/*http://124.202.155.93/WATERBOTTOM/e5/be/6a/c1/233113355095.jpg*/}
                      {/*<img src='http://124.202.155.93/WATERBOTTOM/e5/be/6a/c1/233113355095.jpg' />*/}
					  <img src={item.icon} />
					</li>)
                })
            }         
          </ul>
        </Spin>)
    }	
}

const mapStateToProps = state => {
  return {
    listData:state.content.contentEdit
  }
}

const mapDispatchToProps = dispatch => {
  return {
	  getList:(...args) => dispatch(action_content_edit(...args)),
	  onSubmit:(...args) => dispatch(action_content_submit(...args)),
	  onDelete:(...args) => dispatch(action_content_del(...args)),
	  onConfirm:(...args) => dispatch(action_content_delConfirm(...args)),
      onClear:(...args) => dispatch(action_content_edit_clearAll(...args))
    //gallerylist:(...args) => dispatch(action_content_gallery_list(...args)),
    // 
    //onUploadAPK:(...args) => dispatch(action_content_add_fileList(...args)),
    //onSubmit:(...args) => dispatch(action_content_add_submit(...args)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentEdit);

function drag_yf(){

        var aLi=document.getElementById('ul_app').children;
        //console.log(aLi.length);
        let aPos=[];
        let zIndex=1;
        //1.布局转换
        for(var i=0;i<aLi.length;i++){
            aPos.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop});	
            aLi[i].style.left=aPos[i].left+'px';
            aLi[i].style.top=aPos[i].top+'px';
        }
        for(var i=0;i<aLi.length;i++){
            aLi[i].style.position='absolute';	
            aLi[i].style.margin=0;
            aLi[i].index=i;
        }
        //2.批量拖拽
        for(var i=0;i<aLi.length;i++){
            drag(aLi[i]);	
        }
        
function drag(obj){
		obj.onmousedown=function(ev){
      		console.log(obj.dataset.num);
			obj.style.zIndex=zIndex++;
			clearInterval(obj.timer);
			var e=ev||event;	
			var disX=e.clientX-obj.offsetLeft;
			var disY=e.clientY-obj.offsetTop;
			document.onmousemove=function(ev){
				var e=ev||event;
				obj.style.left=e.clientX-disX+'px';
				obj.style.top=e.clientY-disY+'px';	
				
				//3.碰撞检测 && 找最近的
				
				var nearObj = findNearest(obj);//存最近
				//拿着的是obj		被撞的nearObj
				if(nearObj && nearObj!=obj){//有可能还是自个房子近,排除
					var n=obj.index;
					var m=nearObj.index;
					
					for(var i=0;i<aLi.length;i++){
						if(n<m){
							//←		n<谁<=m
							if(aLi[i].index>n	&& aLi[i].index<=m){
								aLi[i].index--;
								move(aLi[i],{left:aPos[aLi[i].index].left,top:aPos[aLi[i].index].top});	
							}
						}else{
							//→		n>谁>=m
							if(aLi[i].index<n	&& aLi[i].index>=m){
								aLi[i].index++;
								move(aLi[i],{left:aPos[aLi[i].index].left,top:aPos[aLi[i].index].top});	
							}
						}
					}
					
					obj.index=m;
					
				}
			};
			document.onmouseup=function(){
				document.onmousemove=document.onmouseup=null;	
				
				//up时回自个位置
				
				move(obj,{left:aPos[obj.index].left,top:aPos[obj.index].top});
				
			};
			return false;
		};		
	}
function findNearest(obj){
		var minDis=9999999999;
		var minDisIndex=-1;
		for(var i=0;i<aLi.length;i++){
			//if(obj==aLi[i]) continue;
			if(collTest(obj,aLi[i])){//撞到了没
				//既然撞到了，找最近
				var dis = getDis(obj,aLi[i]);//求距离
				if(dis<minDis){
					minDis=dis;
					minDisIndex=i;
				}	
			}
		}
		if(minDisIndex==-1){
			return null;	
		}else{
			return aLi[minDisIndex];	
		}
			
	}
	
function getDis(obj1,obj2){//obj1到obj2的房子的距离
		var a=aPos[obj2.index].left-obj1.offsetLeft;
		var b=aPos[obj2.index].top-obj1.offsetTop;	
		return Math.sqrt(a*a+b*b);
	}
	
function collTest(obj1,obj2){//obj1,和obj2的房子撞
		var l1=obj1.offsetLeft;
		var t1=obj1.offsetTop;
		var r1=obj1.offsetLeft+obj1.offsetWidth;
		var b1=obj1.offsetTop+obj1.offsetHeight;
		
		var l2=aPos[obj2.index].left;//obj1和obj2的房子撞
		var t2=aPos[obj2.index].top;
		var r2=aPos[obj2.index].left+obj2.offsetWidth;
		var b2=aPos[obj2.index].top+obj2.offsetHeight;
		
		if(l1>r2||t1>b2||r1<l2||b1<t2){
			return false;
		}else{
			return true;	
		}
	}

    
}