import {t} from 'i18next';
import * as yup from 'yup';

export const schema = yup.object({
  name: yup.string().min(3).required(t('required')),
  last_name: yup.string().min(3).required(t('required')),
  phone_number: yup.string().min(9).max(9).required(t('required')),
  password: yup.string().min(6).required(t('required')),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  checked: yup.bool().oneOf([true], t('required')),
});
