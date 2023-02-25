import { Button } from 'antd';
import React, { FC, useState } from 'react';
import { AuthForm } from './AuthForm';
import { Modal } from '../Modal';
import { RegisterForm } from './RegisterForm';

export const Login: FC = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isRegisterModal, setIsRegisterModal] = useState<boolean>(false);

  const onCloseModal = (): void => {
    setIsModalOpened(false);
    setIsRegisterModal(false);
  };
  return (
    <>
      <Button
        type="default"
        onClick={(): void => {
          setIsModalOpened(true);
        }}
      >
        Войти
      </Button>
      <Modal opened={isModalOpened} onClose={onCloseModal} size="S">
        {isRegisterModal ? (
          <RegisterForm
            onCloseModal={onCloseModal}
            setIsRegisterModal={setIsRegisterModal}
          />
        ) : (
          <AuthForm
            onCloseModal={onCloseModal}
            setIsRegisterModal={setIsRegisterModal}
          />
        )}
      </Modal>
    </>
  );
};
