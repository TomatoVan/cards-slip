import React, { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { setPagination } from '../../pages/cards/packsReducer';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const initRowsPerPage = 10;
  const [rowsPerPage, setRowsPerPage] = useState(initRowsPerPage);
  const [page, setPage] = useState(1);
  const totalCount = useAppSelector(state => state.packs.params.cardPacksTotalCount);
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
    dispatch(setPagination(value + 1, rowsPerPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const newValue = parseInt(event.target.value, 10);

    setRowsPerPage(newValue);
    setPage(1);
    dispatch(setPagination(page, newValue));
  };

  return (
    <div className="pagination">
      <div className="pagination__list">
        <Stack>
          <table>
            <tbody>
              <tr>
                {!!totalCount && (
                  <TablePagination
                    count={totalCount}
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

export default Pagination;
