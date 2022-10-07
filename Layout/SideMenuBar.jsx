import React, { Component } from 'react';
import { Menu } from 'antd';
import { withTranslation } from 'react-i18next';
import {
  UserOutlined, MessageOutlined, FormatPainterOutlined, TeamOutlined, BankOutlined,FrownOutlined,
  LogoutOutlined, ShopOutlined, SkinOutlined, GatewayOutlined, UserSwitchOutlined
} from '@ant-design/icons';

// const { SubMenu } = Menu;
//<IconFont type={e.icon} />

class SideMenuBar extends Component{
  goToPage = (page, name) => {
    this.props.goToPage(page, name)
  }
  
  render() {
    const {imageUrl,community} = this.props;
        // {/* <div className="logo" onClick={()=>this.goToPage('/m/home')}>Project</div> */}
        let menu;
        menu=<Menu theme="dark" mode="inline" openKeys={this.props.openKeys} onOpenChange={(e) => this.props.onOpenChange(e)} selectedKeys={[this.props.curSelectKey]}>
          <Menu.Item key="/m/dashboard" icon={<BankOutlined />} onClick={()=>this.goToPage('/m/dashboard')}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="/m/admin" icon={<UserOutlined />} onClick={()=>this.goToPage('/m/admin')}>
            Admin List
          </Menu.Item>
          <Menu.Item key="/m/resident" icon={<TeamOutlined />} onClick={()=>this.goToPage('/m/resident')}>
            Resident List
          </Menu.Item>
          <Menu.Item key="/m/messaging" icon={<MessageOutlined />} onClick={()=>this.goToPage('/m/messaging')}>
            Messaging
          </Menu.Item>
          <Menu.Item key="/m/waste/sharing" icon={<SkinOutlined />} onClick={()=>this.goToPage('/m/waste/sharing')}>
            Waste Sharing
          </Menu.Item>
          <Menu.Item key="/m/neighborhood/event" icon={<UserSwitchOutlined />} onClick={()=>this.goToPage('/m/neighborhood/event')}>
            Neighborhood Event
          </Menu.Item>
          <Menu.Item key="/m/mutual/assistance" icon={<GatewayOutlined />} onClick={()=>this.goToPage('/m/mutual/assistance')}>
            Mutual Assistance
          </Menu.Item>
          <Menu.Item key="/m/workforceservice" icon={<ShopOutlined />} onClick={()=>this.goToPage('/m/workforceservice')}>
            Workforce Service
          </Menu.Item>
          <Menu.Item key="/m/workforcejob" icon={<FormatPainterOutlined />} onClick={()=>this.goToPage('/m/workforcejob')}>
            Workforce Job
          </Menu.Item>
          <Menu.Item key="/m/report" icon={<FrownOutlined />} onClick={()=>this.goToPage('/m/report')}>
            Report Issue
          </Menu.Item>
          <Menu.Item key="lg" icon={<LogoutOutlined />} onClick={()=>this.props.logout()}>
            Logout
          </Menu.Item>
          <br />
        </Menu>
    //console.log(imageUrl)
    let communitylogo;
    if(imageUrl === ""){
      communitylogo =<div className="logoname" onClick={()=>this.goToPage('/m/communities')}>{community}</div>

    }else{
      communitylogo=<Menu theme="dark"  mode="inline">
      <img className="communitylogo" src={imageUrl} alt="Avatar" onClick={()=>this.goToPage('/m/communities')}/>
      <div className="logo" onClick={()=>this.goToPage('/m/communities')}>{community} </div>
      </Menu>
    }

    return (
      <>
      {communitylogo}
      <Menu theme="dark" mode="inline" openKeys={this.props.openKeys} onOpenChange={(e) => this.props.onOpenChange(e)} selectedKeys={[this.props.curSelectKey]}>
          {menu}
        </Menu>
      </>
    )

  }
}

export default withTranslation('common')(SideMenuBar);