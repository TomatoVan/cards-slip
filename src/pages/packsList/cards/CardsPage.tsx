import React, { useEffect, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import SchoolIcon from '@mui/icons-material/School';
import IconButton from '@mui/material/IconButton';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { sortingMethods } from '../../../api/PackApi';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import { Cover } from '../../../components/cover/Cover';
import { CustomButton } from '../../../components/customButton/CustomButton';
import { AddAndEditCardModal } from '../../../components/modals/AddAndEditCardModal';
import { Pagination } from '../../../components/pagination/Pagination';
import { Search } from '../../../components/search/Search';

import { Card } from './Card';
import { getCards, setCardsPacks, setResetCardsParams } from './cardsReducer';
import { EmptyPackPage } from './EmptyPackPage';

type PropsType = {
  noAuth?: boolean;
};

export type NewCardType = {
  answer: string;
  createdAt: string;
  gradesList: Array<{
    cardId: number;
    createdAt: string;
    grade: number;
    id: number;
    shots: number;
    updatedAt: string;
    userId: number;
  }>;
  id: number;
  packId: number;
  question: string;
  updatedAt: string;
  userId: number;
};

export const CardsPage = ({ noAuth = false }: PropsType) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  // @ts-ignore
  const cards = useAppSelector(state => state.cards.cards.cards) as NewCardType[];
  const page = useAppSelector(state => state.cards.params.page);
  const cardQuestion = useAppSelector(state => state.cards.params.cardQuestion);
  const pageCount = useAppSelector(state => state.cards.params.pageCount);
  const sortCards = useAppSelector(state => state.cards.params.sortCards);
  const status = useAppSelector(state => state.app.status);
  const userId = useAppSelector(state => state.profile._id);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  const { packName } = location.state as LocationStateType;
  const { id } = location.state as LocationStateType;
  const { authorId } = location.state as LocationStateType;
  const { deckCover } = location.state as LocationStateType;

  const sortCardsByLastUpdate = () => {
    if (status === 'idle') {
      const sortMethod =
        sortCards === sortingMethods.ASC_UPDATE
          ? sortingMethods.DES_UPDATE
          : sortingMethods.ASC_UPDATE;

      dispatch(setCardsPacks(sortMethod));
    }
  };

  // For empty elements
  const emptySearchResults = cards?.length === 0 && cardQuestion !== '';

  // Reset cards params  after page change
  useEffect(() => {
    return () => {
      dispatch(setResetCardsParams());
    };
  }, [dispatch]);

  // Get and update cards
  useEffect(() => {
    if (id) {
      dispatch(getCards(id, pageCount));
    }
  }, [dispatch, page, cardQuestion, pageCount, sortCards, id]);
  // Modals
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  // Navigate
  const navToPacksList = () => {
    navigate('/packs?accessory=All');
  };

  const learnAboutPackHandler = () => {
    navigate(`/learnPage/${id}`, {
      state: {
        packName,
      },
    });
  };

  if (cards?.length === 0 && cardQuestion === '') {
    return (
      <EmptyPackPage
        packName={packName}
        id={id}
        authorId={authorId}
        deckCover={deckCover}
      />
    );
  }
  if (!isLoggedIn && !noAuth) return <Navigate to="/" />;

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
          <IconButton
            onClick={learnAboutPackHandler}
            className="pack__button pack__button--teach"
            aria-label="learn"
            disabled={status === 'loading'}
          >
            <SchoolIcon fontSize="inherit" />
          </IconButton>
        </div>
        <Cover cover={deckCover} cardTitleCover />
      </div>
      <div className="cards__menu">
        <Search location="Cards" />
        {userId === authorId && (
          <CustomButton
            title="Add new card"
            submit={false}
            callBack={handleOpen}
            disabled={status === 'loading'}
          />
        )}
      </div>
      {emptySearchResults ? (
        <div className="empty">
          Cards with the given parameters were not found. Change your search options
        </div>
      ) : (
        <div className="packs">
          <div className="packs__captions">
            <div className="packs__caption">Question</div>
            <div className="packs__caption">Answer</div>
            <div
              className="packs__caption packs__caption--sorting packs__caption--lastUpdate"
              onClick={sortCardsByLastUpdate}
            >
              Last Updated
              {sortCards === sortingMethods.ASC_UPDATE ? (
                <ArrowDropUpOutlinedIcon fontSize="small" />
              ) : (
                <ArrowDropDownOutlinedIcon fontSize="small" />
              )}
            </div>
            <div className="packs__caption packs__caption--grade">Grade</div>
            <div className="packs__caption">Actions</div>
          </div>
          <div className="packs__list" />
          {cards?.map(el => {
            const gradeslist = el.gradesList;
            const gradeslistElem = gradeslist && gradeslist[0];
            // eslint-disable-next-line no-unsafe-optional-chaining
            const gradeNum = gradeslistElem?.grade / gradeslistElem?.shots;

            return (
              <Card
                authorId={el.userId?.toString()}
                packId={id}
                cardId={el.id?.toString()}
                key={Number(el.id)}
                question={el.question}
                answer={el.answer}
                grade={gradeNum}
                lastUpdated={el.updatedAt}
                questionImg=""
              />
            );
          })}
        </div>
      )}

      {!emptySearchResults && <Pagination location="Cards" />}
      <AddAndEditCardModal
        handleClose={handleClose}
        open={open}
        title="Add new card"
        packId={id}
        authorId={userId}
        answer=""
        question=""
        questionImg=""
        cardWork="add"
      />
    </div>
  );
};

export type LocationStateType = {
  packName: string;
  id: string;
  authorId: string;
  deckCover: string | null;
};
