import React, { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { setCardsPagination } from '../../pages/packsList/cards/cardsReducer';
import { setPagination } from '../../pages/packsList/packsReducer';

export const Pagination = () => {
  const dispatch = useAppDispatch();

  const initRowsPerPage = 10;

  const [rowsPerPage, setRowsPerPage] = useState(initRowsPerPage);
  const [page, setPage] = useState(1);

  const totalCountPacks = useAppSelector(state => state.packs.params.cardPacksTotalCount);
  const totalCountCards = useAppSelector(state => state.cards.cardsTotalCount);

  const location = useLocation();
  const currentPlaceIsPacks = location.pathname.split('/').reverse()[0] === 'packs';

  const currenTotalCount = currentPlaceIsPacks ? totalCountPacks : totalCountCards;

  const queryPage = useAppSelector(state => state.packs.params.page);

  // for page reset
  useEffect(() => {
    setPage(queryPage);
  }, [queryPage]);

  const handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    value: number,
  ) => void = (event, value) => {
    setPage(value + 1);

    if (currentPlaceIsPacks) dispatch(setPagination(value + 1, rowsPerPage));
    else dispatch(setCardsPagination(value + 1, rowsPerPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const newValue = parseInt(event.target.value, 10);

    setRowsPerPage(newValue);
    setPage(1);
    dispatch(setPagination(page, newValue));
    if (currentPlaceIsPacks) dispatch(setPagination(page, newValue));
    else dispatch(setCardsPagination(page, newValue));
  };

  return (
    <div className="pagination">
      <div className="pagination__list">
        <Stack>
          <table>
            <tbody>
              <tr>
                {!!totalCountPacks && (
                  <TablePagination
                    count={currenTotalCount}
                    showFirstButton
                    showLastButton
                    page={page - 1}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                )}
              </tr>
            </tbody>
          </table>
        </Stack>
      </div>
    </div>
  );
};
