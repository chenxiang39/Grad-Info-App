import React, { useState } from 'react'
import { Menu } from 'antd';
import style from './TopScrollNavBar.module.less'
import 'antd/dist/antd.less';
import TopScrollNavBarItem from './TopScrollNavBarItem/TopScrollNavBarItem'
import { titleDataArr } from '../../Constant/titleLinkManage';
function TopScrollNavBar(){
    function createMenu(){
        return titleDataArr.map((data,index) => {
           return <TopScrollNavBarItem title = {data.title} link = {data.link}></TopScrollNavBarItem>
        })
    }
        return (
          <div>
            <Menu className = {style.container} mode="horizontal">
              {createMenu()}
            </Menu>
          </div>
          
        );
}

export default TopScrollNavBar;