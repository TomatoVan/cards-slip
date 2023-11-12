import React, { useEffect, useState } from 'react';

import Slider from '@mui/material/Slider';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { setMinMaxCount, setPacksTotalCount } from '../../pages/packsList/packsReducer';

export const RangeSlider = () => {
  const dispatch = useAppDispatch();

  const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount);
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
  const minValue = useAppSelector(state => state.packs.params.min);
  const maxValue = useAppSelector(state => state.packs.params.max);
  const status = useAppSelector(state => state.app.status);

  const [values, setValues] = useState<number[]>([minCardsCount, maxCardsCount]);

  useEffect(() => {
    dispatch(setPacksTotalCount(1, totalCount));
  }, [dispatch, totalCount]);

  useEffect(() => {
    setValues([minCardsCount, maxCardsCount]);
  }, [minCardsCount, maxCardsCount]);

  // for filter reset
  useEffect(() => {
    if (minValue === minCardsCount && maxValue === maxCardsCount) {
      setValues([minValue, maxValue]);
    }
  }, [minValue, maxValue]);

  // inputs max value check
  useEffect(() => {
    if (values[0] > maxCardsCount) setValues([maxCardsCount, maxCardsCount]);
    if (values[1] > maxCardsCount) setValues([values[0], maxCardsCount]);
  }, [values]);

  const onChangeDoubleRange = (
    event: React.SyntheticEvent | Event,
    newValue: number | Array<number>,
  ): void => {
    const newVariableValue = newValue as number[];

    setValues(newVariableValue);
    dispatch(setMinMaxCount(newVariableValue[0], newVariableValue[1]));
  };

  const handleMinInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (status === 'idle') {
      setValues([Number(event.target.value), values[1]]);
      dispatch(setMinMaxCount(Number(event.target.value), values[1]));
    }
  };
  const handleMaxInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (status === 'idle') {
      setValues([values[0], Number(event.target.value)]);
      dispatch(setMinMaxCount(values[0], Number(event.target.value)));
    }
  };

  return (
    <div>
      <div data-testid="slider-title" className="slider slider__title">
        Number of cards
      </div>
      <div className="slider slider__items">
        <input
          className="slider slider__input"
          value={values[0].toString()}
          onChange={handleMinInputChange}
          type="number"
        />
        <Slider
          min={minCardsCount}
          max={maxCardsCount}
          getAriaLabel={() => 'Temperature range'}
          value={values}
          onChangeCommitted={onChangeDoubleRange}
          valueLabelDisplay="auto"
          disabled={status === 'loading'}
        />
        <input
          className="slider slider__input"
          value={values[1].toString()}
          onChange={handleMaxInputChange}
          type="number"
        />
      </div>
    </div>
  );
};
