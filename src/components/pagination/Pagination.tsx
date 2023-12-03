import React, { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { setCardsPagination } from '../../pages/packsList/cards/cardsReducer';
import { setPagination } from '../../pages/packsList/packsReducer';

type PropsType = {
  location: string;
};

export const Pagination = React.memo(({ location }: PropsType) => {
  const dispatch = useAppDispatch();

  // to disable pagination
  const status = useAppSelector(state => state.app.status);
  const isDisabled = status === 'loading';

  const initRowsPerPage = 7;

  const [rowsPerPage, setRowsPerPage] = useState(initRowsPerPage);
  const [page, setPage] = useState(1);

  const totalCountPacks = useAppSelector(state => state.packs.params.cardPacksTotalCount);
  const totalCountCards = useAppSelector(state => state.cards?.cards?.cardsTotalCount);

  const currentPlaceIsPacks = location === 'Packs';

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
    if (currentPlaceIsPacks) dispatch(setPagination(page, newValue));
    else dispatch(setCardsPagination(page, newValue));
  };

  return (
    <div data-testid="pagination" className="pagination">
      <div className="pagination__list">
        <Stack style={{ display: 'flex', flexWrap: 'wrap' }}>
          <table>
            <tbody>
              <tr>
                {!!totalCountPacks && (
                  <TablePagination
                    SelectProps={{
                      disabled: status === 'loading',
                    }}
                    backIconButtonProps={
                      isDisabled
                        ? {
                            disabled: isDisabled,
                          }
                        : undefined
                    }
                    nextIconButtonProps={
                      isDisabled
                        ? {
                            disabled: isDisabled,
                          }
                        : undefined
                    }
                    count={currenTotalCount}
                    showFirstButton
                    showLastButton
                    page={page - 1}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[
                      Number('7'),
                      Number('10'),
                      Number('15'),
                      Number('25'),
                    ]}
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
});
