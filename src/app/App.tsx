import React, { useEffect } from 'react';

import { LinearProgress } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../common/hooks/hooks';
import { HeaderContainer } from '../components/header/HeaderContainer';
import { ErrorSnackBar } from '../components/snackbars/ErrorSnackbar';
import { SuccessSnackBar } from '../components/snackbars/SuccessSnackbar';
import { NotFound } from '../pages/404/NotFound';
import { LearnPage } from '../pages/learnPage/LearnPage';
import { Login } from '../pages/login/Login';
import { CardsPage } from '../pages/packsList/cards/CardsPage';
import { EmptyPackPage } from '../pages/packsList/cards/EmptyPackPage';
import { PacksList } from '../pages/packsList/PacksList';
import { PasswordNew } from '../pages/password-new/PasswordNew';
import { PasswordRecovery } from '../pages/password-recovery/PasswordRecovery';
import { Profile } from '../pages/profile/Profile';
import { Registration } from '../pages/registration/Registration';

import { initializeApp } from './appReducer';

export const App = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const status = useAppSelector(state => state.app.status);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="app">
      <HeaderContainer />
      {status === 'loading' ? (
        <LinearProgress color="primary" />
      ) : (
        <div className="loadingBar" />
      )}
      {/* для тестого перехода по страницам */}
      <div className="test">
        <NavLink className="navlink" to="/">
          login
        </NavLink>
        <NavLink className="navlink" to="/set-new-password/*">
          password-new
        </NavLink>
        <NavLink className="navlink" to="/password-recovery">
          password-recovery
        </NavLink>
        <NavLink className="navlink" to="/registration">
          registration
        </NavLink>
        <NavLink className="navlink" to="/profile">
          profile
        </NavLink>
        <NavLink className="navlink" to="/packs?accessory=All">
          packs
        </NavLink>
      </div>
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="set-new-password/*" element={<PasswordNew />} />
            <Route path="password-recovery" element={<PasswordRecovery />} />
            <Route path="packs" element={<PacksList />} />
            <Route path="registration" element={<Registration />} />
            <Route path="profile" element={<Profile />} />
            <Route path="404" element={<NotFound />} />
            <Route path="cardsPage" element={<CardsPage />} />
            <Route path="emptyPackPage" element={<EmptyPackPage />} />
            <Route path="learnPage/:id" element={<LearnPage />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
          <ErrorSnackBar />
          <SuccessSnackBar />
        </div>
      </div>
    </div>
  );
};
