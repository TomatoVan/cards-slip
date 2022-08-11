import React, { useState } from 'react';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import { useAppSelector } from '../../../common/hooks/hooks';
import { AddAndEditCardModal } from '../../../components/modals/AddAndEditCardModal';
import { DeletePackAndCard } from '../../../components/modals/DeletePackAndCard';

export const Card: React.FC<CardPropsType> = props => {
  const { answer, grade, lastUpdated, question, cardId, packId, authorId } = props;
  const updatedDate = new Date(lastUpdated).toLocaleDateString('ru');
  const status = useAppSelector(state => state.app.status);
  const userId = useAppSelector(state => state.profile._id);

  // Modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const closeEditModalHandler = () => setEditModalOpen(false);
  const openEditModalHandler = () => setEditModalOpen(true);

  const closeDeleteModalHandler = () => setDeleteModalOpen(false);
  const openDeleteModalHandler = () => setDeleteModalOpen(true);

  return (
    <div className="pack">
      <div className="pack__col">{question}</div>
      <div className="pack__col">{answer}</div>
      <div className="pack__col">{updatedDate}</div>
      <div className="pack__col">
        <Rating name="simple-controlled" value={grade} />
      </div>
      <div className="pack__col pack__col--actions">
        <IconButton
          className="pack__button pack__button--teach"
          aria-label="learn"
          size="small"
          disabled={status === 'loading'}
        >
          <SchoolOutlinedIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={openEditModalHandler}
          className="pack__button pack__button--edit"
          aria-label="edit"
          size="small"
          disabled={userId !== authorId || status === 'loading'}
        >
          <EditOutlinedIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={openDeleteModalHandler}
          className="pack__button pack__button--del"
          aria-label="delete"
          size="small"
          disabled={userId !== authorId || status === 'loading'}
        >
          <DeleteOutlineIcon fontSize="inherit" />
        </IconButton>
      </div>
      <Stack direction="row" className="pack__col pack__col--actions" />

      <AddAndEditCardModal
        title="Edit card"
        packId={packId}
        cardId={cardId}
        handleClose={closeEditModalHandler}
        open={editModalOpen}
      />
      <DeletePackAndCard
        open={deleteModalOpen}
        handleClose={closeDeleteModalHandler}
        title="Delete Pack"
        packId={packId}
        cardId={cardId}
        name={question}
      />
    </div>
  );
};

type CardPropsType = {
  question: string;
  answer: string;
  lastUpdated: string;
  grade: number;
  packId: string;
  cardId: string;
  authorId: string;
};
