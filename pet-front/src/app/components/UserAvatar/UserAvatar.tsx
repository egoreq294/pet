import { UserOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { GetUserQuery, GetUserQueryVariables } from '@app/graphql/types';
import { Avatar, Popover } from 'antd';
import React, { FC, useState } from 'react';
import { AvatarContent } from './AvatarContent';
import { GET_USER } from './graphql/getUser';
import styles from './styles.module.scss';

export const UserAvatar: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { data: userData } = useQuery<GetUserQuery, GetUserQueryVariables>(
    GET_USER,
    { errorPolicy: 'all', fetchPolicy: 'no-cache' },
  );

  const user = userData?.user?.getUser || null;

  const handleOpenChange = (newOpen: boolean): void => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={
        <>
          <AvatarContent user={user} />
        </>
      }
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      placement="bottomLeft"
    >
      <Avatar size={40} icon={<UserOutlined />} className={styles.Avatar} />
    </Popover>
  );
};
