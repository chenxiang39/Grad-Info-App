import React, { useState } from 'react'
import { Menu } from 'antd';
import style from './TopScrollNavBar.module.less'
import 'antd/dist/antd.less';
import TopScrollNavBarItem from './TopScrollNavBarItem/TopScrollNavBarItem'
import { titleDataArr } from '../../Constant/titleLinkManage';
function TopScrollNavBar(){
    //https://howtofix.io/antd-menu-generated-dynmically-from-array-leads-to-duplicated-key-undefined-used-in-menu-by-path-id35476
    const createMenu = () => titleDataArr.map((data,index) => {
      let props = {
        key:data + index,
        title : data.title,
        link : data.link
      }
      return TopScrollNavBarItem(props)
    })
    return (
          <div>
            <Menu className = {style.container} mode="horizontal">
              {createMenu()}
            </Menu>
          </div>
          
        );
}

export default TopScrollNavBar;