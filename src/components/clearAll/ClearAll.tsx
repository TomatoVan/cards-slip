import React from 'react';

import FilterAltOffTwoToneIcon from '@mui/icons-material/FilterAltOffTwoTone';
import IconButton from '@mui/material/IconButton';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { setResetPacksParams } from '../../pages/packsList/packsReducer';

export const ClearAll = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(state => state.app.status);

  // to find query
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get('accessory');

  // reset all params
  const clearFiltersHandler = () => {
    if (currentFilter === 'My') {
      dispatch(setResetPacksParams(''));
      navigate('/packs?accessory=All');
    } else {
      dispatch(setResetPacksParams(''));
    }
  };

  return (
    <div className="clearAll">
      <IconButton
        onClick={clearFiltersHandler}
        aria-label="clearAll"
        disabled={status === 'loading'}
      >
        <FilterAltOffTwoToneIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
};
