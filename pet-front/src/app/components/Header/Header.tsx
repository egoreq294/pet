import React, { FC } from 'react';
import { Link } from './Link';
import styles from './styles.module.scss';
import { Register } from '../Register';
import { Auth } from '../Auth';
import { UserAvatar } from '../UserAvatar';
import { useAuthContext } from '@app/contexts';

export const Header: FC = () => {
  const { isAuth } = useAuthContext();

  return (
    <div className={styles.Header}>
      <div className={styles.Nav}>
        <Link to="/">Главная</Link>
      </div>
      <div className={styles.User}>
        {isAuth ? (
          <UserAvatar />
        ) : (
          <>
            <Auth />
            <Register />
          </>
        )}
      </div>
    </div>
  );
};
