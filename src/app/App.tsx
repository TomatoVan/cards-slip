import React, { useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../common/hooks/hooks';
import { HeaderContainer } from '../components/header/HeaderContainer';
import { LinearProgressBar } from '../components/linearProgressBar/LinearProgressBar';
import { ErrorSnackBar } from '../components/snackbars/ErrorSnackbar';
import { SuccessSnackBar } from '../components/snackbars/SuccessSnackbar';
import { NotFound } from '../pages/404/NotFound';
import { LearnPage } from '../pages/learnPage/LearnPage';
import { Login } from '../pages/login/Login';
import { CardsPage } from '../pages/packsList/cards/CardsPage';
import { EmptyPackPage } from '../pages/packsList/cards/EmptyPackPage';
import { PacksPage } from '../pages/packsList/PacksPage';
import { PasswordNew } from '../pages/password-new/PasswordNew';
import { PasswordRecovery } from '../pages/password-recovery/PasswordRecovery';
import { Profile } from '../pages/profile/Profile';
import { Registration } from '../pages/registration/Registration';

import { initializeApp } from './appReducer';

export const App = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(state => state.app.isInitialized);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="preloader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="app">
      <HeaderContainer />
      <LinearProgressBar />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="set-new-password/*" element={<PasswordNew />} />
            <Route path="password-recovery" element={<PasswordRecovery />} />
            <Route path="packs" element={<PacksPage />} />
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
