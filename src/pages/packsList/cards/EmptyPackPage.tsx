import React, { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../common/hooks/hooks';
import { CustomButton } from '../../../components/button/CustomButton';
import { Cover } from '../../../components/cover/Cover';
import { AddAndEditCardModal } from '../../../components/modals/AddAndEditCardModal';

export const EmptyPackPage = React.memo(
  ({ packName, id, authorId, deckCover }: EmptyPackPageType) => {
    const status = useAppSelector(state => state.app.status);
    const userId = useAppSelector(state => state.profile._id);

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
        <div className="cards__learn">
          <div className="cards__title">
            <div className="cards__name cut">{packName}</div>
          </div>
          {deckCover && <Cover cover={deckCover} cardTitleCover />}
        </div>
        <div>
          {userId === authorId ? (
            <div className="empty-pack__flex">
              <div className="empty-pack__text">
                This pack is empty. Click add new pack to fill this pack
              </div>
              <CustomButton
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
                  answer=""
                  question=""
                  questionImg=""
                  cardWork="add"
                />
              )}
            </div>
          ) : (
            <div>This pack is empty. You cant add new pack, someone else`s cards</div>
          )}
        </div>
      </div>
    );
  },
);

type EmptyPackPageType = {
  packName?: string;
  id?: string;
  authorId?: string;
  deckCover?: string | null;
};
