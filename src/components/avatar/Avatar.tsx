import React, { ChangeEvent, useRef } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';

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

  return (
    <div className="avatar">
      <div>
        {avatar ? (
          <img src={avatar} alt="avatar" />
        ) : (
          <img src={defaultAvatar} alt="avatar" />
        )}
      </div>
      <div className="avatar__icon">
        <label htmlFor="avatar">
          <input
            id="avatar"
            type="file"
            onChange={uploadHandler}
            ref={inputRef}
            style={{ display: 'none' }}
          />
          <IconButton onClick={selectFileHandler}>
            <CloudUploadIcon />
          </IconButton>
        </label>
      </div>
    </div>
  );
});
