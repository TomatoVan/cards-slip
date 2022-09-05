import React, { useEffect, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { CardType } from '../../api/CardsApi';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { getCard } from '../../common/utils/smartRandomizer';
import { Cover } from '../../components/cover/Cover';
import { CustomButton } from '../../components/customButton/CustomButton';
import { LocationStateType } from '../packsList/cards/CardsPage';
import { getCards, putCardGrade } from '../packsList/cards/cardsReducer';

import { Grades } from './grades/Grades';

export const LearnPage = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [first, setFirst] = useState<boolean>(true);
  const [grade, setGrade] = useState(0);
  const [error, setError] = useState('disabled');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { id } = useParams<{ id: string }>();
  const { packName } = location.state as LocationStateType;
  const status = useAppSelector(state => state.app.status);
  const cards = useAppSelector(state => state.cards.cards);

  const [card, setCard] = useState<CardType>({
    _id: '',
    cardsPack_id: '',
    user_id: '',
    answer: '',
    question: '',
    grade: 0,
    shots: 0,
    questionImg: '',
    answerImg: '',
    answerVideo: '',
    questionVideo: '',
    comments: '',
    type: '',
    rating: 0,
    more_id: '',
    created: '',
    updated: '',
    __v: 0,
    card_id: '',
  });

  useEffect(() => {
    if (first && id) {
      // should return all pack cards
      dispatch(getCards(id, Infinity));
      setFirst(false);
    }

    if (cards.length > 0) setCard(getCard(cards));
  }, [dispatch, id, cards]);

  const navToPacksList = () => {
    if (status === 'idle') {
      navigate('/packs?accessory=All');
    }
  };

  const handleSetShowAnswer = () => {
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (grade !== 0) {
      if (id) dispatch(putCardGrade(id, { grade, card_id: card._id }));
      setShowAnswer(false);
      setGrade(0);
      setError('disabled');
    } else setError('error');
  };

  return (
    <div className="learn">
      <div onClick={navToPacksList} className="learn__back">
        <ArrowBackIcon />
        Back to Packs List
      </div>
      <div className="frame">
        <h3 className="title">{packName}</h3>
        <div className="learn__question">
          {status === 'loading' ? null : (
            <>
              <div className="learn__question-name">
                {card.question === 'no question' ? (
                  <>
                    <b className="learn__item">Cover:</b>
                    <Cover cover={card.questionImg} />
                  </>
                ) : (
                  <>
                    <b className="learn__item">Question: </b>
                    <span>{card.question}</span>
                  </>
                )}
              </div>
              <div className="learn__answer-count">
                Attempts to answer the question: {card.shots}
              </div>
            </>
          )}
        </div>
        {!showAnswer && (
          <div className="learn__btn">
            <CustomButton
              callBack={handleSetShowAnswer}
              title="Show answer"
              submit={false}
              disabled={status === 'loading'}
            />
          </div>
        )}

        {showAnswer && (
          <div className="learn__answer">
            <div>
              <b className="learn__item">Answer: </b>
              <span>{card.answer}</span>
            </div>
            <div className={`learn__${error}`}>You should chose one</div>
            <Grades setGrade={setGrade} />
            <div className="learn__btn">
              <CustomButton
                title="Next question"
                submit={false}
                callBack={nextQuestion}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
