'use client';

import { ChangeEvent, useEffect } from 'react';
import { MethodProps } from '../../core/types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setRestfulMethod } from '../../store/restfulSlice';

export default function Method({ method, setMethod }: MethodProps) {
  const initialMethod = useAppSelector((state) => state.restful.method);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setMethod(initialMethod);
  }, [initialMethod, setMethod]);

  const onChangeHandler = (event: ChangeEvent) => {
    const select = event.target as HTMLSelectElement;
    const method = select.value;
//ЧТО ЗДЕСЬ ХОТЕЛА?
    // setMethod(method);
    dispatch(setRestfulMethod(method));
  };

  return (
    <div className="request__method">
      <h2 className="method__title">Method</h2>
      <div className="method__custom-select">
        <select
          value={method}
          className="method__select"
          onChange={onChangeHandler}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
    </div>
  );
}
