import React, { useEffect } from 'react';

import { useFormik } from 'formik';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { addCard, changeCardName } from '../../pages/packsList/cards/cardsReducer';
import { CustomButton } from '../button/CustomButton';
import { Input } from '../input/Input';

import { CustomModal } from './CustomModal';

type FormikErrorType = {
  question?: string;
  answer?: string;
};
type PropsType = {
  open: boolean;
  handleClose: () => void;
  title: string;
  packId: string;
  cardId?: string;
  question: string;
  answer: string;
};

export const AddAndEditCardModal = React.memo(
  ({ open, handleClose, title, packId, cardId, question, answer }: PropsType) => {
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

    const formik = useFormik({
      initialValues: {
        question,
        answer,
      },
      validate: values => {
        const errors: FormikErrorType = {};
        const maxQuestionLength = 70;

        if (!values.question) {
          errors.question = 'Поле обязательно для заполнения';
        }
        if (values.question === question && values.answer === answer) {
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
        };

        if (cardId)
          dispatch(
            changeCardName(packId, cardId, data.question, data.answer, cardsPageCount),
          );
        else dispatch(addCard(packId, data.question, data.answer, cardsPageCount));

        formik.resetForm();
        handleClose();
      },
    });

    return (
      <CustomModal title={title} handleClose={handleClose} open={open}>
        <form className="form form__modal" onSubmit={formik.handleSubmit}>
          <Input
            placeholder="Question"
            {...formik.getFieldProps('question')}
            error={formik.errors.question && formik.touched.question}
            errorText={formik.errors.question}
          />
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
