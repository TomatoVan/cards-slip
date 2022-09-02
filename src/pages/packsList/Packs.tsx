import React, { FC, useEffect } from 'react';

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';

import { sortingMethods } from '../../api/PackApi';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';

import { Pack } from './Pack';
import { getPacks, setResetPacksParams, setSortPacks } from './packsReducer';

type PropsType = {
  accessoryQueryFilter: string | null;
};

export const Packs: FC<PropsType> = React.memo(({ accessoryQueryFilter }: PropsType) => {
  const dispatch = useAppDispatch();

  const packs = useAppSelector(state => state.packs.cardPacks);
  const userId = useAppSelector(state => state.packs.params.user_id);
  const profileUserId = useAppSelector(state => state.profile._id);
  const page = useAppSelector(state => state.packs.params.page);
  const pageCount = useAppSelector(state => state.packs.params.pageCount);
  const sortPacks = useAppSelector(state => state.packs.params.sortPacks);
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
  const min = useAppSelector(state => state.packs.params.min);
  const max = useAppSelector(state => state.packs.params.max);
  const packName = useAppSelector(state => state.packs.params.packName);
  const status = useAppSelector(state => state.app.status);

  // For empty elements
  const emptySearchResults = packs.length === 0 && packName !== '';
  const emptySliderResults =
    packs.length === 0 && (max !== maxCardsCount || min !== minCardsCount);

  // Reset packs params  after page change
  useEffect(() => {
    return () => {
      dispatch(setResetPacksParams(''));
    };
  }, [dispatch]);

  // Get and update packs
  useEffect(() => {
    if (accessoryQueryFilter === 'My') dispatch(getPacks({ user_id: profileUserId }));
    else dispatch(getPacks({}));
  }, [
    dispatch,
    page,
    pageCount,
    sortPacks,
    min,
    max,
    packName,
    userId,
    accessoryQueryFilter,
  ]);

  const sortPacksByLastUpdate = () => {
    if (status === 'idle') {
      const sortMethod =
        sortPacks === sortingMethods.ASC_UPDATE
          ? sortingMethods.DES_UPDATE
          : sortingMethods.ASC_UPDATE;

      dispatch(setSortPacks(sortMethod));
    }
  };

  const sortPacksByCount = () => {
    if (status === 'idle') {
      const sortMethod =
        sortPacks === sortingMethods.ASC_CARDS_COUNT
          ? sortingMethods.DES_CARDS_COUNT
          : sortingMethods.ASC_CARDS_COUNT;

      dispatch(setSortPacks(sortMethod));
    }
  };

  return (
    <div>
      {emptySearchResults || emptySliderResults ? (
        <div className="empty">
          Packs with the given parameters were not found. Change your search options
        </div>
      ) : (
        <div className="packs">
          <div className="packs__captions">
            <div className="packs__caption">Name</div>
            <div
              className="packs__caption packs__caption--sorting"
              onClick={sortPacksByCount}
            >
              Cards
              {sortPacks === sortingMethods.ASC_CARDS_COUNT ? (
                <ArrowDropUpOutlinedIcon fontSize="small" />
              ) : (
                <ArrowDropDownOutlinedIcon fontSize="small" />
              )}
            </div>
            <div
              className="packs__caption packs__caption--sorting"
              onClick={sortPacksByLastUpdate}
            >
              Last Update
              {sortPacks === sortingMethods.ASC_UPDATE ? (
                <ArrowDropUpOutlinedIcon fontSize="small" />
              ) : (
                <ArrowDropDownOutlinedIcon fontSize="small" />
              )}
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
      )}
    </div>
  );
});
