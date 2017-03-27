import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"


import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// import EssayList from "./EssayList";
// import CommentList from "./CommentList";
import { Row, Col } from 'antd';

class ContentMenu extends React.Component{
  // handleClick(e) {
  //   this.props.dispatch(action_changeAddressSide(e.key));
  // }
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
        {/*<Menu.Item key="ContentList" {...menuItemLayout} >
          <Link to="/ContentMenu/ContentList">
            List
          </Link>
        </Menu.Item>*/}


        {/*<Menu.Item key="ContentAdd" {...menuItemLayout} >
          <Link to="/ContentMenu/ContentAdd">
            Content Add
          </Link>

        </Menu.Item>*/}

        <Menu.Item key="ContentBanner" {...menuItemLayout} >
          <Link to="/ContentMenu/ContentBanner">
            Banner Edit
          </Link>
        </Menu.Item>

        <Menu.Item key="ContentEdit" {...menuItemLayout} >
          <Link to="/ContentMenu/ContentEdit">
            APP Edit
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

export default connect(mapStateToProps)(ContentMenu);
//display:"flex",justifyContent:"space-around",