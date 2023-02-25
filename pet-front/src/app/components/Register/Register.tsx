import React, { FC, useState } from 'react';
import { Button } from 'antd';
import { Modal } from '../Modal';

import { RegisterForm } from './RegisterForm';

export const Register: FC = () => {
  const [isRegisterModalOpened, setIsRegisterModalOpened] =
    useState<boolean>(false);
  return (
    <>
      <Button
        type="primary"
        onClick={(): void => {
          setIsRegisterModalOpened(true);
        }}
      >
        Зарегистироваться
      </Button>

      <Modal
        opened={isRegisterModalOpened}
        onClose={(): void => {
          setIsRegisterModalOpened(false);
        }}
      >
        <RegisterForm setIsRegisterModalOpened={setIsRegisterModalOpened} />
      </Modal>
    </>
  );
};
