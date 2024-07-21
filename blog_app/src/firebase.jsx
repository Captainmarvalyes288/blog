import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCD6jLf8kJIgGp2-BkqeNpWdiK7hSSCCxk",
  authDomain: "blog-44dbb.firebaseapp.com",
  projectId: "blog-44dbb",
  storageBucket: "blog-44dbb.appspot.com",
  messagingSenderId: "152710844240",
  appId: "1:152710844240:web:2f5d0e2d3164115351a655",
  measurementId: "G-SD5D9TS3RK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
