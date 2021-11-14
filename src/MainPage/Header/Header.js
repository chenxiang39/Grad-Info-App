import React from 'react';
import style from './Header.module.less'
function Header(){
    return (
        <div className={style.container}>
           <div className={style.title}>
               <span><span className={style.titleYellow}>USC</span> GRAD.INFO</span>
           </div>
        </div>
    )
}
export default Header;