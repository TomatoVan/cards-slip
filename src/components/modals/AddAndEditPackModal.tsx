import React, { FC, useEffect } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { addPack, changePackName } from '../../pages/packsList/packsReducer';
import { Button } from '../button/Button';
import { Input } from '../input/Input';

import { CustomModal } from './CustomModal';

type FormikErrorType = {
  packName?: string;
  privatePack?: boolean;
};
type PropsType = {
  open: boolean;
  handleClose: () => void;
  title: string;
  id?: string;
  name?: string;
};

export const AddAndEditPackModal: FC<PropsType> = React.memo(
  ({ open, handleClose, title, id, name }: PropsType) => {
    const profileUserId = useAppSelector(state => state.profile._id);
    const dispatch = useAppDispatch();
    let packName = '';

    // to find query
    const [searchParams, setSearchParams] = useSearchParams();
    const accessoryQueryFilter = searchParams.get('accessory');

    // for edit
    if (name) packName = name;

    // reset form after close
    useEffect(() => {
      if (!open) formik.resetForm();
    }, [open]);

    const formik = useFormik({
      initialValues: {
        packName,
        privatePack: false,
      },
      validate: values => {
        const errors: FormikErrorType = {};
        const maxNameLength = 70;

        if (!values.packName) {
          errors.packName = 'Поле обязательно для заполнения';
        }
        if (values.packName === packName) {
          errors.packName = 'Поле обязательно для изменения';
        }
        if (values.packName.length > maxNameLength) {
          errors.packName = 'Превышена максимальная длина';
        }

        return errors;
      },
      onSubmit: values => {
        const data = {
          packName: values.packName,
          privatePack: values.privatePack,
        };

        // profileUserId and currentFilter for My/All packs correct refresh
        if (id) {
          dispatch(
            changePackName(
              id,
              data.packName,
              data.privatePack,
              profileUserId,
              accessoryQueryFilter,
            ),
          );
        } else {
          dispatch(
            addPack(data.packName, data.privatePack, profileUserId, accessoryQueryFilter),
          );
        }

        formik.resetForm();
        handleClose();
      },
    });

    return (
      <CustomModal title={title} handleClose={handleClose} open={open}>
        <form className="form form__modal" onSubmit={formik.handleSubmit}>
          <Input
            placeholder="Pack name"
            {...formik.getFieldProps('packName')}
            error={formik.errors.packName && formik.touched.packName}
            errorText={formik.errors.packName}
          />
          <FormControlLabel
            label="Private pack"
            control={
              <Checkbox
                checked={formik.values.privatePack}
                {...formik.getFieldProps('privatePack')}
              />
            }
          />
          <div className="submit submit__modals">
            <Button title="Cancel" callBack={handleClose} submit={false} />
            <Button title="Save" submit />
          </div>
        </form>
      </CustomModal>
    );
  },
);
