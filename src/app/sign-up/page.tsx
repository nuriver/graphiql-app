'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../authorization/firebase';
import { signUpSchemaYup } from '../../authorization/validationSchemas';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import '../../../i18n';

export default function SignUp() {
  const { t, i18n } = useTranslation();
  const signUpSchema = signUpSchemaYup(t);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange',
  });

  const [fberror, setFBerror] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = () => {
    setFBerror('');
  };

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: data.name });
      setFBerror('');
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        let errorMessage = error.message;

        errorMessage = errorMessage
          .replace('Firebase: ', '')
          .replace('Error (auth/', '')
          .replace(')', '');
        errorMessage = errorMessage
          .replace(/-/g, ' ')
          .replace(/(\b\w)/g, (char: string) => char.toUpperCase());

        setFBerror(`Error: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="column-fit">
        <h2>{t('sign_up')}</h2>
        <div className="input-cont">
          <p className="input-title">{i18n.t('name')}</p>
          <input
            placeholder={i18n.t('name')}
            {...register('name')}
            type="text"
            onInput={handleInput}
          />
          {errors.name && <p className="sign-error">{errors.name.message}</p>}
        </div>
        <div className="input-cont">
          <p className="input-title">{i18n.t('email')}</p>
          <input
            placeholder={i18n.t('email')}
            {...register('email')}
            type="email"
            onInput={handleInput}
          />
          {errors.email && <p className="sign-error">{errors.email.message}</p>}
        </div>
        <div className="input-cont">
          <p className="input-title">{i18n.t('password')}</p>
          <input
            placeholder={i18n.t('password')}
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            onInput={handleInput}
          />
          {errors.password && (
            <p className="sign-error">{errors.password.message}</p>
          )}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="toggle-password-btn"
          >
            {showPassword ? i18n.t('hide_password') : i18n.t('show_password')}
          </button>
        </div>
        <div className="input-cont">
          <p className="input-title">{i18n.t('confirm_password')}</p>
          <input
            placeholder={i18n.t('confirm_password')}
            {...register('confirmPassword')}
            type={showPassword ? 'text' : 'password'}
            onInput={handleInput}
          />
          {errors.confirmPassword && (
            <p className="sign-error">{errors.confirmPassword.message}</p>
          )}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="toggle-password-btn"
          >
            {showPassword ? i18n.t('hide_password') : i18n.t('show_password')}
          </button>
        </div>
        {fberror && <p className="fb-error">{fberror}</p>}
        <button className="sign-btn" type="submit" disabled={!isValid}>
          {i18n.t('sign_up')}
        </button>
      </form>
    </div>
  );
}
