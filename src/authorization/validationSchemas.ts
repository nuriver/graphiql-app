import * as yup from 'yup';
import '../../i18n';

const firebaseEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const signUpSchemaYup = (t: (key: string) => string) => {
  return yup.object().shape({
    name: yup.string().required(t('name_required')),
    email: yup
      .string()
      .email(t('invalid_email'))
      .matches(firebaseEmailRegex, t('invalid_email'))
      .required(t('email_required')),
    password: yup
      .string()
      .required(t('password_required'))
      .min(8, t('password_min'))
      .matches(/[a-zA-Z]/, t('password_letter_required'))
      .matches(/\d/, t('password_digit_required'))
      .matches(/[!@#$%^&*(),.?":{}|<>]/, t('password_special_char_required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], t('passwords_must_match'))
      .required(t('confirm_password')),
  });
};

export const signInSchemaYup = (t: (key: string) => string) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(t('invalid_email'))
      .matches(firebaseEmailRegex, t('invalid_email'))
      .required(t('email_required')),
    password: yup
      .string()
      .required(t('password_required'))
      .min(8, t('password_min'))
      .matches(/[a-zA-Z]/, t('password_letter_required'))
      .matches(/\d/, t('password_digit_required'))
      .matches(/[!@#$%^&*(),.?":{}|<>]/, t('password_special_char_required')),
  });
};
