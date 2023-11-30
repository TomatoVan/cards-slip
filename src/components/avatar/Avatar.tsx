import React, { ChangeEvent, useRef } from 'react';

import { setError } from '../../app/appReducer';
import defaultAvatar from '../../assets/img/avatar.png';
import { useAppDispatch } from '../../common/hooks/hooks';
import { convertFileToBase64 } from '../../common/utils/Base64Converter';
import { updateUserAvatar } from '../../pages/profile/profileReducer';

type PropsType = {
  avatar: string | null;
};

export const Avatar = React.memo(({ avatar }: PropsType) => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const selectFileHandler = () => {
    if (inputRef) {
      inputRef.current?.click();
    }
  };

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      convertFileToBase64(file, (file64: string) => {
        dispatch(updateUserAvatar(file64));
      });
    }
  };

  const errorHandler = () => {
    dispatch(setError('Avatar picture broken'));
  };

  return (
    <div className="avatar">
      <div>
        {avatar ? (
          <img src={avatar} alt="avatar" onError={errorHandler} />
        ) : (
          <img src={defaultAvatar} alt="avatar" onError={errorHandler} />
        )}
      </div>
      <div>
        {/* <label htmlFor="avatar"> */}
        {/*  <input */}
        {/*    id="avatar" */}
        {/*    type="file" */}
        {/*    accept={'image/*'} */}
        {/*    onChange={uploadHandler} */}
        {/*    ref={inputRef} */}
        {/*    className="avatar__inputHide" */}
        {/*  /> */}
        {/*  <input */}
        {/*    className="avatar__icon" */}
        {/*    type="image" */}
        {/*    src={upload} */}
        {/*    alt="upload" */}
        {/*    onClick={selectFileHandler} */}
        {/*  /> */}
        {/* </label> */}
      </div>
    </div>
  );
});
