import React from 'react';

import defaultAvatar from '../../assets/img/avatar.png';
import { useAppSelector } from '../../common/hooks/hooks';
import { Button } from '../../components/button/Button';
import { EditableSpan } from '../../components/editableSpan/EditableSpan';

export const Profile = React.memo(
  ({ name, avatar, cardsCount, email, logout, editField }: ProfilePropsType) => {
    const status = useAppSelector(state => state.app.status);

    const logoutHandler = (): void => logout();
    const editFieldHandler = (newTitle: string): void => editField(newTitle);

    return (
      <div className="frame">
        <div className="profile">
          <div className="title">Personal Information</div>
          <div className="profile__avatar">
            {avatar ? (
              <img src={avatar} alt="avatar" />
            ) : (
              <img src={defaultAvatar} alt="avatar" />
            )}
          </div>
          <div className="profile__name">
            <h4>
              <EditableSpan name={name} callback={editFieldHandler} />
            </h4>
          </div>
          <div className="profile__email">
            <h4>{email}</h4>
          </div>
          <div className="profile__cards-count">
            <h4>{cardsCount}</h4>
          </div>
          <div className="profile__button">
            <Button
              title="logout"
              submit={false}
              disabled={status === 'loading'}
              callBack={logoutHandler}
            />
          </div>
        </div>
      </div>
    );
  },
);

type ProfilePropsType = {
  editField: (newTitle: string) => void;
  avatar: string;
  name: string;
  email: string;
  cardsCount: number;
  logout: () => void;
};
