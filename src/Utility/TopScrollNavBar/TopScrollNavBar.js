import React, { useState } from 'react'
import { Menu } from 'antd';
import style from './TopScrollNavBar.module.less'
import 'antd/dist/antd.less';
import MyLink from '../MyLink/MyLink';
function TopScrollNavBar(){
    const [current, setcurrent] = useState("ADMISSION INFO");
    const titleDataArr = [
      {title:"ADMISSION INFO"},
      {title:"TRANSFER RECORDS"},
      {title:"NON-COURSE RELATED EVENTS"},
      {title:"COMMENTS"},
      {title:"DEGREE CHECK"}
    ]
    function handleClick(e){
        setcurrent(e.key);
    };
    function createMenu(){
        return titleDataArr.map((data) => {
          let selected = current === data.title? style.selected : style.notselected;
          let path = `${data.title}`;
          return <Menu.Item key= {data.title} className = {[selected, style.item]}>
              {data.title}
              <MyLink to = {path}></MyLink>
            </Menu.Item>
        })
    }
        return (
          <Menu className = {style.container} onClick={(e) => handleClick(e)} selectedKeys={[current]} mode="horizontal">
            {createMenu()}
          </Menu>
        );
}

export default TopScrollNavBar;