import React from 'react'
import Header from './Header/Header'
import MainContent from './MainContent/MainContent';
import { Routes, Route, Navigate, useLocation} from "react-router-dom";
import Search from './Search/Search'
function MainPage(){
    return (
        <div>
            <Header></Header>
            <Routes>
                <Route path="/Search" element = {<Search />}/>
                <Route path="/MainContent/*" element={<MainContent />} />
                <Route path="*"  element={<Navigate to = {"/Search"} replace = {true} />}/>
            </Routes>
        </div>
    )
}

export default MainPage;