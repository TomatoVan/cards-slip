import React from 'react';

import FilterAltOffTwoToneIcon from '@mui/icons-material/FilterAltOffTwoTone';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { setResetPacksParams } from '../../pages/packsList/packsReducer';

type PropsType = {
  accessoryQueryFilter: string | null;
};

export const ClearAll = React.memo(({ accessoryQueryFilter }: PropsType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(state => state.app.status);

  // reset all params
  const clearFiltersHandler = () => {
    if (accessoryQueryFilter === 'My') {
      dispatch(setResetPacksParams(''));
      navigate('/packs?accessory=All');
    } else {
      dispatch(setResetPacksParams(''));
    }
  };

  return (
    <div data-testid="clearAll">
      <div className="search__title">Clear all</div>
      <div className="clearAll">
        <IconButton
          onClick={clearFiltersHandler}
          aria-label="clearAll"
          disabled={status === 'loading'}
        >
          <FilterAltOffTwoToneIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
});
