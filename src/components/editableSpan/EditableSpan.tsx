import React, { ChangeEvent, useState } from 'react';

import TextField from '@mui/material/TextField';

export type EditableSpanPropsType = {
  name: string;
  callback: (newTitle: string) => void;
};

export const EditableSpan = React.memo(({ name, callback }: EditableSpanPropsType) => {
  const [field, setField] = useState<'span' | 'input'>('span');
  const [value, setValue] = useState(name);

  const onDoubleClickHandler = (): void => {
    setField('input');
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.currentTarget.value);
  };

  const onBlurHandler = (): void => {
    callback(value);
    setField('span');
  };

  return (
    <div>
      {field === 'input' ? (
        <TextField
          variant="standard"
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          value={value}
          autoFocus
        />
      ) : (
        <span onDoubleClick={onDoubleClickHandler}>{name}</span>
      )}
    </div>
  );
});
