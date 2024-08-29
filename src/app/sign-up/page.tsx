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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange',
  });

  const [error, setError] = useState('');
  const router = useRouter();

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
      setError('');
      router.push('/');
    } catch (error) {
      setError('Ошибка при создании аккаунта, попробуйте снова.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Create an Account</h2>
        <div>
          <input placeholder="Name" {...register('name')} type="text" />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <input placeholder="Email" {...register('email')} type="email" />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            placeholder="Password"
            {...register('password')}
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <input
            placeholder="Confirm Password"
            {...register('confirmPassword')}
            type="password"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">Create</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
