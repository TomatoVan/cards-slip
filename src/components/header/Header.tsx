import React from 'react';

import { useNavigate } from 'react-router-dom';

import defaultAvatar from '../../assets/img/avatar.png';
import logo from '../../assets/img/logo.svg';
import { CustomButton } from '../button/CustomButton';

export const Header = React.memo(
  ({ isAuth, userName, avatar, navToSignIn }: HeaderPropsType) => {
    const navigate = useNavigate();
    const navigateHandler = () => {
      navigate('/profile');
    };

    return (
      <header className="header">
        <div className="container container--header">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          {isAuth ? (
            <div className="user-data">
              <div className="user-data__name" onClick={navigateHandler}>
                {userName}
              </div>
              <div className="user-data__avatar" onClick={navigateHandler}>
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
