import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { useDebounce } from '../../common/hooks/useDebounce';
import { getCardsByTitle } from '../../pages/packsList/cards/cardsReducer';
import { getPacksByTitle } from '../../pages/packsList/packsReducer';

type PropsType = {
  location: string;
};

export const Search: FC<PropsType> = ({ location }) => {
  const dispatch = useAppDispatch();
  const disabled = useAppSelector(state => state.app.status);
  const searchValue = useAppSelector(state => state.packs.params.packName);

  const delay = 500;
  const [value, setValue] = useState('');

  const debouncedValue = useDebounce<string>(value, delay);

  const currentPlaceIsPacks = location === 'Packs';

  useEffect(() => {
    if (currentPlaceIsPacks) dispatch(getPacksByTitle(value));
    else dispatch(getCardsByTitle(value));
  }, [dispatch, debouncedValue]);

  // for filter reset
  useEffect(() => {
    if (searchValue === '') setValue(searchValue);
  }, [dispatch, searchValue]);

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
          type="search"
          className="search__input"
          disabled={disabled === 'loading'}
        />
      </label>
    </div>
  );
};
