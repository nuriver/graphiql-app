'use client';
import { useState } from 'react';

export default function BodyRequest() {
  const [body, setBody] = useState('');
  return (
    <div className="request__body">
      <h2 className="body__title">Body</h2>
      <input
        value={body}
        type="text"
        className="rest__input rest__body-input"
        onChange={(item) => setBody(item.target.value)}
      ></input>
      <button className="body-input__button">Prettify</button>
    </div>
  );
}
