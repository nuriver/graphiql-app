'use client';

import React, { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../authorization/firebase';
import { signInSchemaYup } from '../../authorization/validationSchemas';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import '../../../i18n';

export default function SignIn() {
  const { t } = useTranslation();
  const signInSchema = signInSchemaYup(t);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: 'onChange',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push('/');
      setError('');
    } catch (error) {
      setError(t('error_message'));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="column">
        <h2>{t('sign_in')}</h2>
        <div className="input-cont">
          <p className="input-title">{t('email')}</p>
          <input placeholder={t('email')} {...register('email')} type="email" />
          {errors.email && <p className="sign-error">{errors.email.message}</p>}
        </div>
        <div className="input-cont">
          <p className="input-title">{t('password')}</p>
          <div className="password-input">
            <input
              placeholder={t('password')}
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
            />
          </div>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="toggle-password-btn"
          >
            {showPassword ? t('hide_password') : t('show_password')}
          </button>
          {errors.password && (
            <p className="sign-error">{errors.password.message}</p>
          )}
        </div>
        {error && <p className="sign-error">{error}</p>}
        <button className="sign-btn" type="submit" disabled={!isValid}>
          {t('sign_in')}
        </button>
      </form>
    </div>
  );
}
