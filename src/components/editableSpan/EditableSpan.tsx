import React, { ChangeEvent, useState, KeyboardEvent } from 'react';

import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { useAppSelector } from '../../common/hooks/hooks';

export type EditableSpanPropsType = {
  name: string;
  updateUserInfoHandler: (newTitle: string) => void;
};

export const EditableSpan = React.memo(
  ({ name, updateUserInfoHandler }: EditableSpanPropsType) => {
    const status = useAppSelector(state => state.app.status);

    const [field, setField] = useState<'span' | 'input'>('span');
    const [value, setValue] = useState(name);

    const setEditModeHandler = (): void => {
      setField('input');
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
      setValue(event.currentTarget.value);
    };

    const onBlurHandler = () => {
      updateUserInfoHandler(value);
      setField('span');
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        updateUserInfoHandler(value);
        setField('span');
      }
    };

    return (
      <div>
        {field === 'input' ? (
          <TextField
            variant="standard"
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onKeyDown={e => onKeyDownHandler(e)}
            value={value}
            autoFocus
          />
        ) : (
          <div>
            <span>{name}</span>
            <IconButton
              onClick={setEditModeHandler}
              aria-label="edit"
              size="small"
              disabled={status === 'loading'}
            >
              <BorderColorRoundedIcon fontSize="inherit" />
            </IconButton>
          </div>
        )}
      </div>
    );
  },
);
