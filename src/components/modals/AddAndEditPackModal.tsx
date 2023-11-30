import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';
import { useSearchParams } from 'react-router-dom';

import noCover from '../../assets/img/noCover.png';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { convertFileToBase64 } from '../../common/utils/Base64Converter';
import { addPack, changePack } from '../../pages/packsList/packsReducer';
import { CustomButton } from '../customButton/CustomButton';
import { Input } from '../input/Input';

import { CustomModal } from './CustomModal';

type FormikErrorType = {
  packName?: string;
  privatePack?: boolean;
  deckCover?: string;
};
type PropsType = {
  packWork: string;
  open: boolean;
  handleClose: () => void;
  title: string;
  id?: string;
  name: string;
  deckCover: string;
};

export const AddAndEditPackModal: FC<PropsType> = React.memo(
  ({ open, handleClose, title, id, name, deckCover, packWork }: PropsType) => {
    const profileUserId = useAppSelector(state => state.profile._id);

    const dispatch = useAppDispatch();

    // to find query
    const [searchParams, setSearchParams] = useSearchParams();
    const accessoryQueryFilter = searchParams.get('accessory');

    // reset form after close
    useEffect(() => {
      if (!open) formik.resetForm();
    }, [open]);

    // for name
    useEffect(() => {
      formik.values.packName = name;
    }, [name]);

    // for deckCover
    const [isCoverBroken, setIsCoverBroke] = useState(false);
    const [cover, setCover] = useState(deckCover);

    useEffect(() => {
      setCover(deckCover);
    }, [deckCover]);

    useEffect(() => {
      formik.values.deckCover = cover;
    }, [cover]);

    // if cover img invalid
    const errorHandler = () => {
      setIsCoverBroke(true);
    };

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length) {
        const file = e.target.files[0];

        convertFileToBase64(file, (file64: string) => {
          setCover(file64);
          formik.values.deckCover = file64;
        });
      }
    };

    const clearCoverCallback = () => {
      if (packWork === 'add') {
        setCover('');
        formik.values.deckCover = '';
      }
    };

    const formik = useFormik({
      initialValues: {
        packName: name,
        privatePack: false,
        deckCover,
      },
      validate: values => {
        const errors: FormikErrorType = {};
        const maxNameLength = 70;

        if (!values.packName) {
          errors.packName = 'Поле обязательно для заполнения';
        }
        if (values.deckCover === deckCover && values.packName === name) {
          errors.packName = 'Поле обязательно для изменения';
        }
        if (values.packName && values.packName.length > maxNameLength) {
          errors.packName = 'Превышена максимальная длина';
        }

        return errors;
      },
      onSubmit: values => {
        const data = {
          packName: values.packName,
          privatePack: values.privatePack,
          deckCover: values.deckCover,
        };

        // profileUserId and currentFilter for My/All packs correct refresh
        if (id) {
          dispatch(
            changePack(
              id,
              data.packName,
              data.privatePack,
              data.deckCover,
              profileUserId,
              accessoryQueryFilter,
            ),
          );
        } else {
          dispatch(
            addPack(
              data.packName,
              data.privatePack,
              data.deckCover,
              profileUserId,
              accessoryQueryFilter,
            ),
          );
        }

        formik.resetForm();
        handleClose();
        if (packWork === 'add') setCover('');
      },
    });

    return (
      <CustomModal
        title={title}
        handleClose={handleClose}
        open={open}
        clearCoverCallback={clearCoverCallback}
      >
        <form className="form form__modal" onSubmit={formik.handleSubmit}>
          {cover && cover !== '' ? (
            <div>
              <img
                className="form__coverImg"
                src={isCoverBroken ? noCover : cover}
                alt="avatar"
                onError={errorHandler}
              />
            </div>
          ) : null}
          {/* <label htmlFor="cover"> */}
          {/*  <input */}
          {/*    id="cover" */}
          {/*    type="file" */}
          {/*    accept={'image/*'} */}
          {/*    onChange={uploadHandler} */}
          {/*    className="avatar__inputHide" */}
          {/*  /> */}
          {/*  <div className="form__ContainerBtn"> */}
          {/*    <Button component="span" variant="contained" className="form__coverBtn"> */}
          {/*      Change cover */}
          {/*    </Button> */}
          {/*  </div> */}
          {/* </label> */}
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
            <CustomButton title="Cancel" callBack={handleClose} submit={false} />
            <CustomButton title="Save" submit />
          </div>
        </form>
      </CustomModal>
    );
  },
);
