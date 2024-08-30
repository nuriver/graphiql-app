import Image from 'next/image';
import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="links">
        MADE BY
        <a className="hoverline"
          href="https://github.com/nuriver"
          target="_blank"
          rel="noopener noreferrer"
        >
          ALEXEI
        </a>
        ,
        <a className="hoverline"
          href="https://github.com/maryinfun"
          target="_blank"
          rel="noopener noreferrer"
        >
          MARIA
        </a>{' '}
        &
        <a className="hoverline"
          href="https://github.com/aauroraaborealisrs"
          target="_blank"
          rel="noopener noreferrer"
        >
          KATE
        </a>
      </div>

      <div>2024</div>

      <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
        <Image
          src="/assets/images/rs-logo.png"
          alt="RS logo"
          width={50}
          height={50}
        />
      </a>
    </footer>
  );
}
