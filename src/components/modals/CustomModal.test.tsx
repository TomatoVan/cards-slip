import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { componentRender } from '../componentRender/componentRender';

import { CustomModal } from './CustomModal';

describe('Modal', () => {
  const modalTitle = 'test';

  const customModal = (
    <CustomModal
      open
      title={modalTitle}
      handleClose={() => ({})}
      clearCoverCallback={() => ({})}
    >
      <div>Children test</div>
    </CustomModal>
  );

  test('Test Modal DOM', () => {
    componentRender(customModal);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  test('Test Modal title', () => {
    componentRender(customModal);
    expect(screen.getByTestId('modal-title')).toHaveTextContent(modalTitle);
  });

  test('Test Modal children', () => {
    componentRender(customModal);
    expect(screen.getByText('Children test')).toBeInTheDocument();
  });
});
