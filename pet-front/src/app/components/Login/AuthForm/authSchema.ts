import * as yup from 'yup';
import { ERROR_MESSAGES } from '../constants';

export const authSchema = yup.object().shape({
  email: yup
    .string()
    .email(ERROR_MESSAGES.invalidEmail)
    .required(ERROR_MESSAGES.fieldRequired),
  password: yup
    .string()
    .min(8, ERROR_MESSAGES.passwordMinLength)
    .max(32, ERROR_MESSAGES.passwordMaxLength)
    .required(ERROR_MESSAGES.fieldRequired),
});
