import React from 'react'
import Header from './Header/Header'
import MainContent from './MainContent/MainContent';
import { Routes, Route, Navigate} from "react-router-dom";
import Search from './Search/Search'
import Login from './Login/Login';
function MainPage(){
    return (
        <div>
            <Header></Header>
            <Routes>
                <Route path="/Login" element = {<Login />} />
                <Route path="/Search" element = {<Search />}/>
                <Route path="/MainContent/*" element={<MainContent />} />
                <Route path="*"  element={<Navigate to = {"/Login"} replace = {true} />}/>
            </Routes>
        </div>
    )
}

export default MainPage;