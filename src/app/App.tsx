import React, {useEffect} from 'react';
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import Test from "../pages/test/Test";
import Login from "../pages/login/Login";
import PasswordNew from "../pages/password-new/PasswordNew";
import PasswordRecovery from "../pages/password-recovery/PasswordRecovery";
import Registration from "../pages/registration/Registration";
import NoteFound from "../pages/404/NotFound";
import Cards from '../pages/cards/Cards';
import ProfileContainer from "../pages/profile/ProfileContainer";
import HeaderContainer from "../components/header/HeaderContainer";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {initializeApp} from "./appReducer";
import {ErrorSnackBar} from "../components/errorSnackbar/ErrorSnackbar";
import {CircularProgress} from "@mui/material";

const App = () => {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(state => state.app.isInitialized);

    useEffect(() => {
        dispatch(initializeApp());
    }, []);


    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        );
    }

    return (
        <div className='app'>
            <HeaderContainer/>
            {/* для тестого перехода по страницам */}
            <div className="test">
                <NavLink className='navlink' to="/">login</NavLink>
                <NavLink className='navlink' to="/set-new-password/*">password-new</NavLink>
                <NavLink className='navlink' to="/password-recovery">password-recovery</NavLink>
                <NavLink className='navlink' to="/registration">registration</NavLink>
                <NavLink className='navlink' to="/profile">profile</NavLink>
                <NavLink className='navlink' to="/cards">cards</NavLink>
                <NavLink className='navlink' to="/test">test</NavLink>
            </div>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path='/' element={<Login/>}/>
                        <Route path='/set-new-password/*' element={<PasswordNew/>}/>
                        <Route path='/password-recovery' element={<PasswordRecovery/>}/>
                        <Route path='/cards' element={<Cards/>}/>
                        <Route path='/registration' element={<Registration/>}/>
                        <Route path='/profile' element={<ProfileContainer/>}/>
                        <Route path='/test' element={<Test/>}/>
                        <Route path="/404" element={<NoteFound/>}/>
                        <Route path="*" element={<Navigate to='/404'/>}/>
                    </Routes>
                    <ErrorSnackBar/>
                </div>
            </div>
        </div>
    );
}

export default App;