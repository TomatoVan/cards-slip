import React from 'react';

import { useNavigate } from 'react-router-dom';

import defaultAvatar from '../../assets/img/avatar.png';
import logo from '../../assets/img/logo.png';
import { CustomButton } from '../button/CustomButton';

export const Header = React.memo(
  ({ isAuth, userName, avatar, navToSignIn }: HeaderPropsType) => {
    const navigate = useNavigate();
    const navigatePacksHandler = () => {
      navigate('/packs?accessory=All');
    };
    const navigateProfileHandler = () => {
      navigate('/profile');
    };

    return (
      <header className="header">
        <div className="container container--header">
          <div className="header__title" onClick={navigatePacksHandler}>
            <img src={logo} alt="Logo" className="header__logo" />
            <div className="header__text">CARDS SLIP</div>
          </div>
          {isAuth ? (
            <div className="user-data">
              <div className="user-data__name" onClick={navigateProfileHandler}>
                {userName}
              </div>
              <div className="user-data__avatar" onClick={navigateProfileHandler}>
                {avatar ? (
                  <img src={avatar} alt="avatar" className="user-data__avatarImg" />
                ) : (
                  <img
                    src={defaultAvatar}
                    alt="avatar"
                    className="user-data__avatarImg"
                  />
                )}
              </div>
            </div>
          ) : (
            <CustomButton submit={false} callBack={navToSignIn} title="Sign in" />
          )}
        </div>
      </header>
    );
  },
);

type HeaderPropsType = {
  navToSignIn: () => void;
  isAuth: boolean;
  userName: string;
  avatar: string;
};
