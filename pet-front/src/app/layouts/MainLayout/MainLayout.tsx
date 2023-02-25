import { Header } from '@app/components';
import { Home } from '@app/pages';

import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from './styles.module.scss';

export const NotFound: FC = () => {
  return <span>Not Found</span>;
};

export const MainLayout: FC = () => {
  return (
    <div className={styles.Layout}>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};
