import React, { useEffect } from 'react';

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

import { sortingMethods } from '../../api/PackApi';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';

import { Pack } from './Pack';
import { getPacks, setSortPacks } from './packsReducer';

export const Packs = () => {
  const dispatch = useAppDispatch();
  const packs = useAppSelector(state => state.packs.cardPacks);
  const userId = useAppSelector(state => state.packs.params.user_id);
  const page = useAppSelector(state => state.packs.params.page);
  const pageCount = useAppSelector(state => state.packs.params.pageCount);
  const sortPacks = useAppSelector(state => state.packs.params.sortPacks);
  const min = useAppSelector(state => state.packs.params.min);
  const max = useAppSelector(state => state.packs.params.max);
  const packName = useAppSelector(state => state.packs.params.packName);
  const disabled = useAppSelector(state => state.app.status);

  useEffect(() => {
    dispatch(getPacks({}));
  }, [dispatch, page, pageCount, sortPacks, min, max, packName, userId]);

  const updateSortPacksHandler = () => {
    if (disabled === 'idle') {
      const sortMethod =
        sortPacks === sortingMethods.ASC_UPDATE
          ? sortingMethods.DES_UPDATE
          : sortingMethods.ASC_UPDATE;

      dispatch(setSortPacks(sortMethod));
    }
  };

  return (
    <div className="packs">
      <div className="packs__captions">
        <div className="packs__caption">Name</div>
        <div className="packs__caption">Cards</div>
        <div
          className="packs__caption packs__caption--lastUpdate"
          onClick={updateSortPacksHandler}
        >
          Last Update
          <div>
            <ArrowDropDownOutlinedIcon fontSize="small" />
          </div>
        </div>
        <div className="packs__caption">Created by</div>
        <div className="packs__caption">Actions</div>
      </div>
      <div className="packs__list">
        {packs.map(el => {
          return (
            <Pack
              key={el._id}
              id={el._id}
              authorId={el.user_id}
              name={el.name}
              author={el.user_name}
              cards={el.cardsCount}
              lastUploaded={el.updated}
            />
          );
        })}
      </div>
    </div>
  );
};