import React, { useState } from 'react';

import { Navigate, useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../common/hooks/hooks';
import { ClearAll } from '../../components/clearAll/ClearAll';
import { CustomButton } from '../../components/customButton/CustomButton';
import { Filter } from '../../components/filter/Filter';
import { AddAndEditPackModal } from '../../components/modals/AddAndEditPackModal';
import { Pagination } from '../../components/pagination/Pagination';
import { RangeSlider } from '../../components/rangeSlider/rangeSlider';
import { Search } from '../../components/search/Search';

import { Packs } from './Packs';

export const PacksPage = () => {
  const status = useAppSelector(state => state.app.status);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  // to find query
  const [searchParams, setSearchParams] = useSearchParams();
  const accessoryQueryFilter = searchParams.get('accessory');

  // Modals
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  if (!isLoggedIn) return <Navigate to="/" />;

  return (
    <div className="cards">
      <div className="cards__top">
        <div className="cards__title">Packs list</div>
        <CustomButton
          title="Add new pack"
          callBack={handleOpen}
          submit={false}
          disabled={status === 'loading'}
        />
      </div>
      <AddAndEditPackModal
        title="Add new pack"
        open={open}
        handleClose={handleClose}
        name=""
        deckCover=""
        packWork="add"
      />
      <div className="cards__menu">
        <Search location="Packs" />
        <Filter accessoryQueryFilter={accessoryQueryFilter} />
        <RangeSlider />
        <ClearAll accessoryQueryFilter={accessoryQueryFilter} />
      </div>
      <Packs accessoryQueryFilter={accessoryQueryFilter} />
      <Pagination location="Packs" />
    </div>
  );
};
