import React, { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './styles.module.scss';
import { Typography } from 'antd';

interface LinkProps {
  to: string;
  children: ReactNode;
}

export const Link: FC<LinkProps> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }): string =>
        cn(styles.Link, { [styles.ActiveLink]: isActive })
      }
    >
      <Typography.Title level={4} className={styles.LinkTitle}>
        {children}
      </Typography.Title>
    </NavLink>
  );
};
