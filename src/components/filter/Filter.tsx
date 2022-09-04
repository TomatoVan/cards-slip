import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { setError } from '../../app/appReducer';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import {
  setPacksOfAllUsers,
  setPacksOfCertainUser,
  setResetPacksParams,
} from '../../pages/packsList/packsReducer';

type PropsType = {
  accessoryQueryFilter: string | null;
};

export const Filter = React.memo(({ accessoryQueryFilter }: PropsType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const id = useAppSelector(state => state.profile._id);
  const status = useAppSelector(state => state.app.status);
  const filter = useAppSelector(state => state.packs.params.user_id);

  const [isActive, setIsActive] = useState(false);

  const getMyPacksHandler = () => {
    dispatch(setResetPacksParams(id));
    dispatch(setPacksOfCertainUser(id));
    setIsActive(true);
  };
  const getAllPacksHandler = () => {
    dispatch(setPacksOfAllUsers());
    setIsActive(false);
  };

  // for filter reset
  useEffect(() => {
    if (filter === '') setIsActive(false);
  }, [filter]);

  useEffect(() => {
    if (accessoryQueryFilter === 'My') {
      setIsActive(true);
    } else if (accessoryQueryFilter === 'All') {
      setIsActive(false);
      navigate('/packs?accessory=All');
    } else {
      dispatch(setError('invalid accessory'));
    }
  }, [accessoryQueryFilter]);

  return (
    <div className="filter">
      <div className="filter__title">Show packs cards</div>
      <div className="filter__buttons">
        <Link to="/packs?accessory=My">
          <button
            onClick={getMyPacksHandler}
            disabled={status === 'loading'}
            type="button"
            className={
              isActive
                ? 'filter__button filter__button--blue'
                : 'filter__button filter__button--light'
            }
          >
            My
          </button>
        </Link>
        <Link to="/packs?accessory=All">
          <button
            onClick={getAllPacksHandler}
            type="button"
            disabled={status === 'loading'}
            className={
              isActive
                ? 'filter__button filter__button--light'
                : 'filter__button filter__button--blue'
            }
          >
            All
          </button>
        </Link>
      </div>
    </div>
  );
});
