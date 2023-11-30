import React, { ChangeEvent, useEffect, useState } from 'react';

import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import FormControl from '@mui/material/FormControl/FormControl';
import { useFormik } from 'formik';

import noCover from '../../assets/img/noCover.png';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { convertFileToBase64 } from '../../common/utils/Base64Converter';
import { addCard, changeCard } from '../../pages/packsList/cards/cardsReducer';
import { CustomButton } from '../customButton/CustomButton';
import { Input } from '../input/Input';

import { CustomModal } from './CustomModal';

type FormikErrorType = {
  question?: string;
  answer?: string;
  questionImg?: string;
};
type PropsType = {
  open: boolean;
  handleClose: () => void;
  title: string;
  packId: string;
  cardId?: string;
  question: string;
  answer: string;
  questionImg: string;
  cardWork: string;
};

export const AddAndEditCardModal = React.memo(
  ({
    open,
    handleClose,
    title,
    packId,
    cardId,
    question,
    answer,
    questionImg,
    cardWork,
  }: PropsType) => {
    const dispatch = useAppDispatch();

    const cardsPageCount = useAppSelector(state => state.cards.params.pageCount);

    // for name
    useEffect(() => {
      formik.values.question = question;
    }, [question]);

    // for answer
    useEffect(() => {
      formik.values.answer = answer;
    }, [answer]);

    // for deckCover
    const [isCoverBroken, setIsCoverBroke] = useState(false);
    const [cover, setCover] = useState(questionImg);

    useEffect(() => {
      setCover(questionImg);
    }, [questionImg]);

    useEffect(() => {
      formik.values.questionImg = cover;
    }, [cover]);

    // if cover img invalid
    const errorHandler = () => {
      setIsCoverBroke(true);
    };

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length) {
        const file = e.target.files[0];

        convertFileToBase64(file, (file64: string) => {
          setCover(file64);
          formik.values.questionImg = file64;
        });
      }
    };

    const clearCoverCallback = () => {
      if (cardWork === 'add') {
        setCover('');
        formik.values.questionImg = '';
      }
    };

    // for select

    const [questionType, setQuestionType] = useState('text');

    useEffect(() => {
      if (cover) setQuestionType('img');
      if (questionImg === '') setQuestionType('text');
      if (question === 'no question' && questionImg !== '') setQuestionType('img');
    }, [question, questionImg]);

    const selectHandleChange = (event: SelectChangeEvent) => {
      setQuestionType(event.target.value as string);
    };

    const formik = useFormik({
      initialValues: {
        question,
        answer,
        questionImg,
      },
      validate: values => {
        const errors: FormikErrorType = {};
        const maxQuestionLength = 70;

        if (questionType === 'text' && !values.question) {
          errors.question = 'Поле обязательно для заполнения';
        }
        if (questionType === 'img' && !values.questionImg) {
          errors.question = 'Поле обязательно для заполнения';
        }
        if (
          values.answer === answer &&
          values.questionImg === questionImg &&
          values.question === question
        ) {
          errors.question = 'Поле обязательно для изменения';
        }
        if (values.question.length > maxQuestionLength) {
          errors.question = 'Превышена максимальная длина';
        }

        return errors;
      },
      onSubmit: values => {
        const data = {
          question: values.question,
          answer: values.answer,
          questionImg: values.questionImg,
        };

        if (cardId)
          dispatch(
            changeCard(
              packId,
              cardId,
              data.question,
              data.answer,
              data.questionImg,
              cardsPageCount,
            ),
          );
        else
          dispatch(
            addCard(packId, data.question, data.answer, data.questionImg, cardsPageCount),
          );

        formik.resetForm();
        handleClose();
        if (cardWork === 'add') setCover('');
      },
    });

    return (
      <CustomModal
        title={title}
        handleClose={handleClose}
        open={open}
        clearCoverCallback={clearCoverCallback}
      >
        <form className="form form__modal" onSubmit={formik.handleSubmit}>
          {cover ? null : (
            <div className="form__containerSelect">
              <FormControl className="form__selectBlock">
                <InputLabel>Question Type</InputLabel>
                <Select
                  className="form__select"
                  label="Question Type"
                  value={questionType}
                  onChange={selectHandleChange}
                >
                  <MenuItem value="text">Text</MenuItem>
                  {/* <MenuItem value="img">Image</MenuItem> */}
                </Select>
              </FormControl>
            </div>
          )}

          {questionType === 'text' ? (
            <Input
              placeholder="Question"
              {...formik.getFieldProps('question')}
              error={formik.errors.question && formik.touched.question}
              errorText={formik.errors.question}
            />
          ) : (
            <div>
              {cover && cover !== '' ? (
                <div>
                  <img
                    className="form__coverImg"
                    src={isCoverBroken ? noCover : cover}
                    alt="avatar"
                    onError={errorHandler}
                  />
                </div>
              ) : null}
              {/* <label htmlFor="cover"> */}
              {/*  <input */}
              {/*    id="cover" */}
              {/*    type="file" */}
              {/*    accept={'image/*'} */}
              {/*    onChange={uploadHandler} */}
              {/*    className="avatar__inputHide" */}
              {/*  /> */}
              {/*  <div className="form__ContainerBtn"> */}
              {/*    <Button component="span" variant="contained" className="form__coverBtn"> */}
              {/*      Change cover */}
              {/*    </Button> */}
              {/*  </div> */}
              {/* </label> */}
            </div>
          )}
          <Input
            placeholder="Answer"
            {...formik.getFieldProps('answer')}
            error={formik.errors.answer && formik.touched.answer}
            errorText={formik.errors.answer}
          />
          <div className="submit submit__modals">
            <CustomButton title="Cancel" callBack={handleClose} submit={false} />
            <CustomButton title="Save" submit />
          </div>
        </form>
      </CustomModal>
    );
  },
);
