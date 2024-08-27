'use client';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '../store/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    const initialStore = makeStore();
    setStore(initialStore);
  }, []);

  if (!store) return null;

  return <Provider store={store}>{children}</Provider>;
}
