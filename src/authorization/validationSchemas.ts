import * as yup from 'yup';

const firebaseEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const signUpSchema = yup.object().shape({
  name: yup.string().required('Имя обязательно'),
  email: yup
    .string()
    .email('Некорректный формат email')
    .matches(firebaseEmailRegex, 'Некорректный формат email')
    .required('Email обязателен'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .matches(/[a-zA-Z]/, 'Пароль должен содержать хотя бы одну букву')
    .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Пароль должен содержать хотя бы один специальный символ'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Пароли должны совпадать')
    .required('Подтверждение пароля обязательно'),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Некорректный формат email')
    .matches(firebaseEmailRegex, 'Некорректный формат email')
    .required('Email обязателен'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .matches(/[a-zA-Z]/, 'Пароль должен содержать хотя бы одну букву')
    .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Пароль должен содержать хотя бы один специальный символ'
    ),
});
