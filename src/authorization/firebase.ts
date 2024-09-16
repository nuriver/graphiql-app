import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBs7jjwmfuQ8-0bdwVfDzKhaVsw1f9ep8I',
  authDomain: 'test-ac409.firebaseapp.com',
  projectId: 'test-ac409',
  storageBucket: 'test-ac409.appspot.com',
  messagingSenderId: '259349664586',
  appId: '1:259349664586:web:bc72ffd407ccfa0811e7b3',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
