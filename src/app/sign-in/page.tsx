'use client';

import React, { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../authorization/firebase';
import { signInSchema } from '../../authorization/validationSchemas';
import { useRouter } from 'next/navigation';

export default function SignIn() {
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
      setError('We do not recognize you. Try again or sign up.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="column">
        <h2>Sign in</h2>
        <div className="input-cont">
          <p className="input-title">Email</p>
          <input placeholder="Email" {...register('email')} type="email" />
          {errors.email && <p className="sign-error">{errors.email.message}</p>}
        </div>
        <div className="input-cont">
          <p className="input-title">Password</p>
          <div className="password-input">
            <input
              placeholder="Password"
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
            />
          </div>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="toggle-password-btn"
          >
            {showPassword ? 'Hide' : 'Show password'}
          </button>
          {errors.password && (
            <p className="sign-error">{errors.password.message}</p>
          )}
        </div>
        {error && <p className="sign-error">{error}</p>}
        <button className="sign-btn" type="submit" disabled={!isValid}>
          Sign in
        </button>
      </form>
    </div>
  );
}
