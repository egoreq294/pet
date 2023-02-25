import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RegisterFormValues } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './styles.module.scss';
import { Alert, Button, Input, Typography } from 'antd';
import { useAuthContext } from '@app/contexts';
import { registerSchema } from './registerSchema';
import { register } from '@api/services';
import { isAxiosError } from 'axios';

interface RegisterFormProps {
  setIsRegisterModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterForm: FC<RegisterFormProps> = ({
  setIsRegisterModalOpened,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { setIsAuth } = useAuthContext();
  const form = useForm<RegisterFormValues>({
    defaultValues: { fullName: '', email: '', password: '' },
    resolver: yupResolver(registerSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data: RegisterFormValues): Promise<void> => {
    setLoading(true);
    const { fullName, email, password } = data;

    try {
      const response = await register({ email, password, fullName });
      localStorage.setItem('access-token', response.data.accessToken);
      setIsAuth(true);
      setIsRegisterModalOpened(false);
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
        <Typography.Title level={4}>Форма регистрации</Typography.Title>
        <div className={styles.InputContainer}>
          <Typography.Text>ФИО</Typography.Text>
          <Controller
            name="fullName"
            control={control}
            render={({ field }): React.ReactElement => (
              <Input
                className={styles.Input}
                disabled={loading}
                status={!!errors?.fullName?.message ? 'error' : undefined}
                {...field}
              />
            )}
          />
          {!!errors?.fullName?.message && (
            <Typography.Text type="danger">
              {errors?.fullName?.message}
            </Typography.Text>
          )}
        </div>
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
            Зарегистироваться
          </Button>
        </div>
      </div>
    </form>
  );
};
