import React from 'react';

type PropsType = {
  callBack?: () => void;
  title: string;
  submit: boolean;
  disabled?: boolean;
};
export const Button = React.memo(({ callBack, title, disabled, submit }: PropsType) => {
  let className;

  if (title === 'Cancel') className = 'cancel';
  if (title === 'Delete') className = 'delete';

  return (
    <button
      type={submit ? 'submit' : 'button'}
      disabled={disabled}
      className={`button button--${className}`}
      onClick={callBack}
    >
      {title}
    </button>
  );
});
