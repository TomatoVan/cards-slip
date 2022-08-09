import React, { ChangeEvent, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { useDebounce } from '../../common/hooks/useDebounce';
import { getCardsByTitle } from '../../pages/packsList/cards/cardsReducer';
import { getPacksByTitle } from '../../pages/packsList/packsReducer';

export const Search = () => {
  const dispatch = useAppDispatch();
  const disabled = useAppSelector(state => state.app.status);
  const delay = 500;
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, delay);

  const location = useLocation();
  const currentPlaceIsPacks = location.pathname.split('/').reverse()[0] === 'packs';

  useEffect(() => {
    if (currentPlaceIsPacks) dispatch(getPacksByTitle(value));
    else dispatch(getCardsByTitle(value));
    dispatch(getPacksByTitle(value));
  }, [dispatch, debouncedValue]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.currentTarget.value);
  };

  return (
    <div className="search">
      <div className="search__title">Search</div>
      <label htmlFor="input" className="search__label">
        <input
          value={value}
          onChange={onChangeHandler}
          placeholder="Provide your text"
          type="text"
          className="search__input"
          disabled={disabled === 'loading'}
        />
      </label>
    </div>
  );
};
