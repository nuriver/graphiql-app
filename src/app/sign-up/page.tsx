'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../authorization/firebase';
import { signUpSchema } from '../../authorization/validationSchemas';
import { useRouter } from 'next/navigation';

export default function SignUp() {
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
    } catch (error) {
      let errorMessage = error.message || 'An unknown error occurred';

      errorMessage = errorMessage
        .replace('Firebase: ', '')
        .replace('Error (auth/', '')
        .replace(')', '');
      errorMessage = errorMessage
        .replace(/-/g, ' ')
        .replace(/(\b\w)/g, (char) => char.toUpperCase());

      setFBerror(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="column-fit">
        <h2>Sign Up</h2>
        <div className="input-cont">
          <p className="input-title">Name</p>
          <input
            placeholder="Name"
            {...register('name')}
            type="text"
            onInput={handleInput}
          />
          {errors.name && <p className="sign-error">{errors.name.message}</p>}
        </div>
        <div className="input-cont">
          <p className="input-title">Email</p>
          <input
            placeholder="Email"
            {...register('email')}
            type="email"
            onInput={handleInput}
          />
          {errors.email && <p className="sign-error">{errors.email.message}</p>}
        </div>
        <div className="input-cont">
          <p className="input-title">Password</p>
          <input
            placeholder="Password"
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
            {showPassword ? 'Hide' : 'Show password'}
          </button>
        </div>
        <div className="input-cont">
          <p className="input-title">Confirm Password</p>
          <input
            placeholder="Confirm Password"
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
            {showPassword ? 'Hide' : 'Show password'}
          </button>
        </div>
        {fberror && <p className="fb-error">{fberror}</p>}
        <button className="sign-btn" type="submit" disabled={!isValid}>
          Sign up
        </button>
      </form>
    </div>
  );
}
