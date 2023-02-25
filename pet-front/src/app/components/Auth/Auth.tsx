import React, { FC, useState } from 'react';

import { AuthForm } from './AuthForm';
import { Button } from 'antd';
import { Modal } from '../Modal';

export const Auth: FC = () => {
  const [isAuthModalOpened, setIsAuthModalOpened] = useState<boolean>(false);
  return (
    <>
      <Button
        type="primary"
        onClick={(): void => {
          setIsAuthModalOpened(true);
        }}
      >
        Авторизоваться
      </Button>
      <Modal
        opened={isAuthModalOpened}
        onClose={(): void => {
          setIsAuthModalOpened(false);
        }}
        size="S"
      >
        <AuthForm setIsAuthModalOpened={setIsAuthModalOpened} />
      </Modal>
    </>
  );
};
