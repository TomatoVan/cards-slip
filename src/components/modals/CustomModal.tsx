import React, { ReactNode } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

type PropsType = {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
  title: string;
};

export const CustomModal = React.memo(
  ({ children, open, handleClose, title }: PropsType) => {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="modals">
              <div className="modals modals__title">
                <div className="cut">{title}</div>
                <CloseIcon onClick={() => handleClose()} />
              </div>
              <hr className="modals modals__hr" />
              {children}
            </div>
          </Box>
        </Modal>
      </div>
    );
  },
);
