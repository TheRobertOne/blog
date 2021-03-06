import React from 'react';
import { connect } from "react-redux";
import { Link }  from "react-router";
import Login from "./Login";
import { Menu, Icon, Tooltip,Col,Row,Popconfirm} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import {
    action_login_modal_visible,

} from "../actions/loginAction";

 class App extends React.Component{
  componentDidMount(){
    //store.dispatch()
  }
  render() {
    const {headAddress} = this.props;

    //处理头部导航在有a标签包住的情况下，无法改变颜色bug
    //#108ee9 rgba(0, 0, 0, 0.65)
    const headStyle = [["#108ee9","#ecf6fd"],["#108ee9","#ecf6fd"]];
    const headArr = ["ContentMenu","DataMenu"];
    for(let i = 0;i<headArr.length;i++){
      if(headAddress === headArr[i]){
        headStyle[i] = ["#108ee9","#ecf6fd"];
      }else{
        headStyle[i] = ["rgba(0, 0, 0, 0.65)",""];
      }
    }

    return (<div>
      
      <Menu
        //onClick={this.handleClick.bind(this)} justifyContent:"space-around" borderBottom:"none",paddingBottom:"20px"
        selectedKeys={[headAddress]}
        mode="horizontal"
        //theme="light"
        style={{display:"flex",fontSize:"20px",justifyContent:"center"}}
      >

        
        


       { /*<Row  style={{flexGrow:"0.1",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"18px"}} >
            <Icon type="frown-o" style={{flexGrow:"1"}} />
            <span style={{flexGrow:"1",fontWeight:"bold"}}>纸灰机</span>
        </Row>*/}

        

        <Menu.Item key="ContentMenu" style={{backgroundColor:headStyle[0][1]}} >
          <Link to="/ContentMenu/ContentBanner" style={{color:headStyle[0][0]}}  >
            <Icon type="home" />Content
          </Link>
        </Menu.Item>
        <Menu.Item key="DataMenu" style={{backgroundColor:headStyle[1][1]}} >
          <Link to="/DataMenu/LinkClicks" style={{color:headStyle[1][0]}} >
            <Icon type="info-circle-o" />Data
          </Link>
        </Menu.Item>


        <Menu.Item key="dsadsad" style={{display:"flex",justifyContent:"flex-end"}} >


        <Row  >
          <Popconfirm 
            title="确定退出?" 
            onConfirm={e => {
              //console.log("确定了")
              this.props.dispatch(action_login_modal_visible(true))
            }}
            okText="Yes" 
            cancelText="No"
          >
              <Icon type="github" /> Logout
          </Popconfirm>
        </Row>
        
        </Menu.Item>       


      </Menu>
       {this.props.children}
       <Login />
    </div>);
  }
}

function mapStateToProps(state){
  return {
    headAddress:state.address.head
  }
}

export default connect(mapStateToProps)(App);