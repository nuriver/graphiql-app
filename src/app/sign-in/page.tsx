'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../authorization/firebase';
import { signInSchema } from '../../authorization/validationSchemas';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: 'onChange',
  });

  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(user);
      router.push('/');
      setError('');
    } catch (error) {
      setError('who r u');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign in</h2>
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
        <button type="submit">Sign in</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
