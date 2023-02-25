import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AuthFormValues } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './styles.module.scss';
import { Button, Input, Typography, Alert } from 'antd';
import { useAuthContext } from '@app/contexts';
import { authSchema } from './authSchema';
import { auth } from '@api/services';
import { isAxiosError } from 'axios';

interface AuthFormProps {
  setIsAuthModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthForm: FC<AuthFormProps> = ({ setIsAuthModalOpened }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { setIsAuth } = useAuthContext();
  const form = useForm<AuthFormValues>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(authSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data: AuthFormValues): Promise<void> => {
    setLoading(true);
    setError(null);
    const { email, password } = data;

    try {
      const response = await auth({ email, password });
      localStorage.setItem('access-token', response.data.accessToken);
      setIsAuth(true);
      setIsAuthModalOpened(false);
    } catch (e) {
      if (isAxiosError(e)) {
        setError(
          e.response?.data?.message ||
            'При выполнении операции произошла ошибка',
        );
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.Form}>
        <Typography.Title level={4}>Форма авторизации</Typography.Title>
        <div className={styles.InputContainer}>
          <Typography.Text>Email</Typography.Text>
          <Controller
            name="email"
            control={control}
            render={({ field }): React.ReactElement => (
              <Input
                className={styles.Input}
                disabled={loading}
                status={!!errors?.email?.message ? 'error' : undefined}
                {...field}
              />
            )}
          />
          {!!errors?.email?.message && (
            <Typography.Text type="danger">
              {errors?.email?.message}
            </Typography.Text>
          )}
        </div>
        <div className={styles.InputContainer}>
          <Typography.Text>Пароль</Typography.Text>
          <Controller
            name="password"
            control={control}
            render={({ field }): React.ReactElement => (
              <Input.Password
                className={styles.Input}
                disabled={loading}
                status={!!errors?.password?.message ? 'error' : undefined}
                type="password"
                {...field}
              />
            )}
          />
          {!!errors?.password?.message && (
            <Typography.Text type="danger">
              {errors?.password?.message}
            </Typography.Text>
          )}
        </div>
        {!!error && (
          <div className={styles.InputContainer}>
            <Alert message={error} type="error" showIcon />
          </div>
        )}
        <div className={styles.InputContainer}>
          <Button type="primary" block disabled={loading} htmlType="submit">
            Авторизоваться
          </Button>
        </div>
      </div>
    </form>
  );
};
