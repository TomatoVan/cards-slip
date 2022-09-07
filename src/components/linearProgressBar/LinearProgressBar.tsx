import React from 'react';

import { LinearProgress } from '@mui/material';

import { useAppSelector } from '../../common/hooks/hooks';

export const LinearProgressBar = () => {
  const status = useAppSelector(state => state.app.status);

  return (
    <div>
      {status === 'loading' ? (
        <LinearProgress color="primary" />
      ) : (
        <div className="loadingBar" />
      )}
    </div>
  );
};
