import React, { useState } from 'react';

import { useAppSelector } from '../../common/hooks/hooks';
import { Button } from '../../components/button/Button';
import { ClearAll } from '../../components/clearAll/ClearAll';
import { Filter } from '../../components/filter/Filter';
import { AddAndEditPackModal } from '../../components/modals/AddAndEditPackModal';
import { Pagination } from '../../components/pagination/Pagination';
import { RangeSlider } from '../../components/rangeSlider/rangeSlider';
import { Search } from '../../components/search/Search';

import { Packs } from './Packs';

export const PacksList = () => {
  const status = useAppSelector(state => state.app.status);

  // Modals
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <div className="cards">
      <div className="cards__top">
        <div className="cards__title">Packs list</div>
        <Button
          title="Add new pack"
          callBack={handleOpen}
          submit={false}
          disabled={status === 'loading'}
        />
      </div>
      <AddAndEditPackModal title="Add new pack" open={open} handleClose={handleClose} />
      <div className="cards__menu">
        <Search location="Packs" />
        <Filter />
        <RangeSlider />
        <ClearAll />
      </div>
      <Packs />
      <Pagination location="Packs" />
    </div>
  );
};
