import React, { FC, useState } from 'react';
import { useAuthContext } from '@app/contexts';
import { GetUser_Output } from '@app/graphql/types';

import { Button, Descriptions } from 'antd';
import styles from './styles.module.scss';
import { logout } from '@api/services';

interface AvatarContentProps {
  user: GetUser_Output | null;
}

export const AvatarContent: FC<AvatarContentProps> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setIsAuth } = useAuthContext();

  const onLogoutClick = async (): Promise<void> => {
    setLoading(true);

    try {
      await logout();
      localStorage.setItem('access-token', '');
      setIsAuth(false);
    } catch {}
  };

  return (
    <div className={styles.Content}>
      <Descriptions column={1} size="small">
        <Descriptions.Item label="ФИО">{user?.fullName}</Descriptions.Item>
        <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
      </Descriptions>

      <Button
        type="primary"
        onClick={onLogoutClick}
        disabled={loading}
        size="small"
      >
        Выйти
      </Button>
    </div>
  );
};
