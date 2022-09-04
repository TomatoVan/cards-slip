import React, { useEffect, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { CardType } from '../../api/CardsApi';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { CustomButton } from '../../components/button/CustomButton';
import { LocationStateType } from '../packsList/cards/CardsPage';
import { getCards, putCardGrade } from '../packsList/cards/cardsReducer';

import { Grades } from './grades/Grades';

const getCard = (cards: CardType[]) => {
  const maxGradeValue = 6;
  const sum = cards.reduce(
    (acc, card) => acc + (maxGradeValue - card.grade) * (maxGradeValue - card.grade),
    0,
  );
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum =
        acc.sum + (maxGradeValue - card.grade) * (maxGradeValue - card.grade);

      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 },
  );

  return cards[res.id + 1];
};

export const LearnPage = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [first, setFirst] = useState<boolean>(true);
  const [grade, setGrade] = useState(0);
  const [error, setError] = useState('disabled');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const disabled = useAppSelector(state => state.app.status);
  const cards = useAppSelector(state => state.cards.cards);
  const { packName } = location.state as LocationStateType;

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
      // передаем бесконечность чтобы возвращало все карточки пака
      dispatch(getCards(id, Infinity));
      setFirst(false);
    }

    if (cards.length > 0) setCard(getCard(cards));
  }, [dispatch, id, cards]);
  const navToPacksList = () => {
    if (disabled === 'idle') {
      navigate('/packs?accessory=All');
    }
  };

  const handleSetShowAnswer = () => {
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (grade !== 0) {
      dispatch(putCardGrade({ grade, card_id: card._id }));
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
          <div className="learn__question-name">
            <b>Question:</b>
            <span>{card.question}</span>
          </div>
          <div className="learn__answer-count">
            Количество попыток ответов на вопрос: {card.shots}
          </div>
        </div>
        <div className="learn__btn">
          <CustomButton
            callBack={handleSetShowAnswer}
            title="Show answer"
            submit={false}
          />
        </div>
        {showAnswer && (
          <div className="learn__answer">
            <div>
              <b>Answer:</b>
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
