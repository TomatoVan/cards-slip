import React, { ReactNode } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';

type PropsType = {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
  title: string;
  clearCoverCallback?: () => void;
};

export const CustomModal = React.memo(
  ({ children, open, handleClose, title, clearCoverCallback }: PropsType) => {
    const onCloseHandler = () => {
      if (clearCoverCallback) {
        clearCoverCallback();
      }
      handleClose();
    };

    return (
      <div>
        <Modal
          data-testid="modal"
          open={open}
          onClose={onCloseHandler}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modals">
            <div className="modals__title">
              <div data-testid="modal-title" className="cut">
                {title}
              </div>
              <CloseIcon onClick={onCloseHandler} />
            </div>
            <hr className="modals__hr" />
            {children}
          </div>
        </Modal>
      </div>
    );
  },
);
