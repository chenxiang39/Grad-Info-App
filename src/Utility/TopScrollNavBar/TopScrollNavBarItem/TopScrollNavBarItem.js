import React from 'react'
import { Menu } from 'antd';
import style from './TopScrollNavBarItem.module.less'
import 'antd/dist/antd.less';
import MyLink from '../../MyLink/MyLink';
import  {useMatch,useResolvedPath} from "react-router-dom";
export default function TopScrollNavBarItem(props){
    let {title,link,key} = props;
    let resolved = useResolvedPath(link);
    let match = useMatch({ path: resolved.pathname, end: true });
    let selected = match ? style.selected : style.notselected;
    return (
        <Menu.Item key = {key} className = {[selected, style.item, style.itemText]}>
            {title}
            <MyLink to = {link}></MyLink>
        </Menu.Item>
    )
}