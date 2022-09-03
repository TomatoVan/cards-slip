import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { Avatar } from '../../components/avatar/Avatar';
import { Button } from '../../components/button/Button';
import { EditableSpan } from '../../components/editableSpan/EditableSpan';
import { logoutTC } from '../login/loginReducer';

import { updateUserName } from './profileReducer';

export const Profile = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const avatar = useAppSelector(state => state.profile.avatar);
  const name = useAppSelector(state => state.profile.name);
  const email = useAppSelector(state => state.profile.email);
  const cardsCount = useAppSelector(state => state.profile.publicCardPacksCount);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const status = useAppSelector(state => state.app.status);

  const logout = () => dispatch(logoutTC());
  const updateUserInfoHandler = (newTitle: string) => dispatch(updateUserName(newTitle));

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <div className="frame">
      <div className="profile">
        <div className="title">Personal Information</div>
        <div className="profile__avatar">
          <Avatar avatar={avatar} />
        </div>
        <div className="profile__name">
          <h4>
            <EditableSpan name={name} updateUserInfoHandler={updateUserInfoHandler} />
          </h4>
        </div>
        <div className="profile__email">
          <h4>{email}</h4>
        </div>
        <div className="profile__cards-count">
          <h4>Cards created: {cardsCount}</h4>
        </div>
        <div className="profile__button">
          <Button
            title="logout"
            submit={false}
            disabled={status === 'loading'}
            callBack={logout}
          />
        </div>
      </div>
    </div>
  );
};
