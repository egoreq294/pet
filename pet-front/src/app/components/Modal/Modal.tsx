import React, { FC, ReactNode } from 'react';
import { Modal as AntModal } from 'antd';
import { MODAL_WIDTH_MAP } from './constants';

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'S' | 'M' | 'L';
}

export const Modal: FC<ModalProps> = ({ opened, onClose, size, children }) => {
  return (
    <AntModal
      open={opened}
      onCancel={onClose}
      footer={null}
      width={size ? MODAL_WIDTH_MAP?.[size] : undefined}
    >
      {children}
    </AntModal>
  );
};
