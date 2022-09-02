import React, { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../common/hooks/hooks';
import { Button } from '../../../components/button/Button';
import { AddAndEditCardModal } from '../../../components/modals/AddAndEditCardModal';

export const EmptyPackPage = React.memo(({ packName, id }: EmptyPackPageType) => {
  const status = useAppSelector(state => state.app.status);

  const navigate = useNavigate();

  const navToPacksList = () => {
    if (status === 'idle') {
      navigate('/packs?accessory=All');
    }
  };

  // Modals
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  return (
    <div className="cards">
      <div className="cards__top">
        <div onClick={navToPacksList} className="cards__back">
          <ArrowBackIcon />
          Back to Packs List
        </div>
      </div>
      <div className="cards__title cut">{packName}</div>
      <div className="empty-pack__flex">
        <div className="empty-pack__text">
          This pack is empty. Click add new pack to fill this pack
        </div>
        <Button
          title="Add new cards"
          callBack={handleOpen}
          submit={false}
          disabled={false}
        />
        {id && (
          <AddAndEditCardModal
            handleClose={handleClose}
            open={open}
            title="Add new card"
            packId={id}
          />
        )}
      </div>
    </div>
  );
});

type EmptyPackPageType = {
  packName?: string;
  id?: string;
};
