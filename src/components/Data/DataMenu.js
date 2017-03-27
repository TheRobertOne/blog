import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"


import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// import EssayList from "./EssayList";
// import CommentList from "./CommentList";
import { Row, Col } from 'antd';

class DataMenu extends React.Component{
  componentDidMount(){
    //this.props.dispatch(action_changeAddressSide("EssayList"));
  }
  render() {
    const { sideAddress } = this.props;
    const menuItemLayout = {
      style:{fontSize:"16px"}
    };
    return (<Row>
    <Col span={2} style={{textAlign:"center"}}>
      <Menu
        //onClick={this.handleClick.bind(this)}
        selectedKeys={[sideAddress]}
        mode="vertical"
        theme="light"
        //{...formLayout}
        
      >
        <Menu.Item key="LinkClicks" {...menuItemLayout} >
          <Link to="DataMenu/LinkClicks">
            Link Clicks
          </Link>
        </Menu.Item>


        <Menu.Item key="ApkClicks" {...menuItemLayout} >
          <Link to="/DataMenu/ApkClicks">
            Apk Clicks
          </Link>

        </Menu.Item>

        <Menu.Item key="BannerClicks" {...menuItemLayout} >
          <Link to="/DataMenu/BannerClicks">
            Banner Clicks
          </Link>
        </Menu.Item>
        
        </Menu>
    </Col>
    <Col span={22}>
      {this.props.children}
    </Col>
    </Row>);
  }
}

function mapStateToProps(state){
  return {
    sideAddress:state.address.side
  }
}

export default connect(mapStateToProps)(DataMenu);
//display:"flex",justifyContent:"space-around",