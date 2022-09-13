import SideMenuBar from './SideMenuBar';

import React, { Component } from 'react';
import { Drawer, Layout } from 'antd';

const { Sider } = Layout;

class MenuDrawer extends Component{
  
  render() {
    return (
      <>
       <Drawer
          className="sidebar__drawer"
          title={null}
          placement={'left'}
          closable={false}
          onClose={this.props.onClose}
          visible={this.props.visible}
          key={'leftdrawer'}
          maskClosable={true}
        >
        <Sider 
          className="drawer__menu-root"
          >
          {/* <SideMenuBar openkeys={this.state.openKeys} onOpenChange={(e) => this.onOpenChange(e)} /> */}
          <SideMenuBar
            goToPage={this.props.goToPage}
            collapsed={false}
            openKeys={this.props.openKeys}
            onOpenChange={(e) => this.props.onOpenChange(e)}
            curSelectKey={this.props.curSelectKey}
            menus={this.props.menus}
            role={this.props.role}
            imageUrl={this.props.imageUrl}
            community={this.props.community}
            logout={this.props.logout}
          />
        </Sider>
        </Drawer>
      </>
    )
  }
}

export default MenuDrawer;