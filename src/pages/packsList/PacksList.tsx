import React, { useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../common/hooks/hooks';
import { CustomButton } from '../../components/button/CustomButton';
import { ClearAll } from '../../components/clearAll/ClearAll';
import { Filter } from '../../components/filter/Filter';
import { AddAndEditPackModal } from '../../components/modals/AddAndEditPackModal';
import { Pagination } from '../../components/pagination/Pagination';
import { RangeSlider } from '../../components/rangeSlider/rangeSlider';
import { Search } from '../../components/search/Search';

import { Packs } from './Packs';

export const PacksList = () => {
  const status = useAppSelector(state => state.app.status);

  // to find query
  const [searchParams, setSearchParams] = useSearchParams();
  const accessoryQueryFilter = searchParams.get('accessory');

  // Modals
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

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
