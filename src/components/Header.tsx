'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useAuth } from '../authorization/AuthContext';
import { auth } from '../authorization/firebase';
import Link from 'next/link';

export default function Header() {
  const [isToggled, setIsToggled] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <header className="header-main">
      <Link href="/" className="header-logo"></Link>
      <div className="toggle-cont">
        <div className="toggle-lang">RU</div>
        <div className="toggle-switch">
          <input
            className="toggle-input"
            id="toggle"
            type="checkbox"
            checked={isToggled}
            onChange={handleToggle}
          />
          <label className="toggle-label" htmlFor="toggle"></label>
        </div>
        <div className="toggle-lang">ENG</div>
      </div>

      {user ? (
        <button className="hoverline" onClick={handleSignOut}>
          SIGN OUT
        </button>
      ) : (
        <div className="header-btns">
          <button className="hoverline" onClick={handleSignIn}>
            SIGN IN
          </button>
          <button onClick={handleSignUp}>SIGN UP</button>
        </div>
      )}
    </header>
  );
}