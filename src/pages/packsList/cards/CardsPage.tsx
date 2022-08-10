import React, { memo, useEffect, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import { Button } from '../../../components/button/Button';
import { AddAndEditCardModal } from '../../../components/modals/AddAndEditCardModal';
import { Pagination } from '../../../components/pagination/Pagination';
import { Search } from '../../../components/search/Search';
import { setResetPacksParams } from '../packsReducer';

import { Card } from './Card';
import { getCards, setResetCardsParams } from './cardsReducer';
import { EmptyPackPage } from './EmptyPackPage';

export const CardsPage = memo(() => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const cards = useAppSelector(state => state.cards.cards);
  const page = useAppSelector(state => state.cards.params.page);
  const cardQuestion = useAppSelector(state => state.cards.params.cardQuestion);
  const pageCount = useAppSelector(state => state.cards.params.pageCount);
  const sortCards = useAppSelector(state => state.cards.params.sortCards);
  const status = useAppSelector(state => state.app.status);

  const { packName } = location.state as LocationStateType;
  const { id } = location.state as LocationStateType;

  // Reset cards params  after page change
  useEffect(() => {
    return () => {
      dispatch(setResetCardsParams());
    };
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getCards(id));
    }
  }, [dispatch, page, cardQuestion, pageCount, sortCards, id]);

  // Modals
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  // Navigate
  const navToPacksList = () => {
    navigate('/packs');
  };

  if (cards.length === 0 && cardQuestion === '') {
    return <EmptyPackPage packName={packName} id={id} />;
  }

  return (
    <div className="cards">
      <div className="cards__top">
        <div onClick={navToPacksList} className="cards__back">
          <ArrowBackIcon />
          Back to Packs List
        </div>
      </div>
      <div className="cards__title">{packName}</div>
      <div className="cards__menu">
        <Search location="Cards" />
        <Button
          title="Add new card"
          submit={false}
          callBack={handleOpen}
          disabled={status === 'loading'}
        />
      </div>
      <div className="packs">
        <div className="packs__captions">
          <div className="packs__caption">Question</div>
          <div className="packs__caption">Answer</div>
          <div className="packs__caption">Last Updated</div>
          <div className="packs__caption">Grade</div>
          <div className="packs__caption">Actions</div>
        </div>
        <div className="packs__list" />
        {cards.map(el => {
          return (
            <Card
              authorId={el.user_id}
              packId={id}
              cardId={el._id}
              key={el._id}
              question={el.question}
              answer={el.answer}
              grade={el.grade}
              lastUpdated={el.updated}
            />
          );
        })}
      </div>
      <Pagination location="Cards" />
      <AddAndEditCardModal
        handleClose={handleClose}
        open={open}
        title="Add new card"
        packId={id}
      />
    </div>
  );
});

export type LocationStateType = {
  packName: string;
  id: string;
};
