'use client';
import {type FirebaseApp, getApp, getApps, initializeApp} from 'firebase/app';
import {Auth, getAuth, connectAuthEmulator} from 'firebase/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
  Firestore,
} from 'firebase/firestore';

import {firebaseConfig} from './config';

export function initializeFirebase(): {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} {
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  // NOTE: The emulators are not enabled here, but you can enable them if you want
  // by uncommenting the lines below.
  //
  // if (process.env.NEXT_PUBLIC_EMULATOR_HOST) {
  //   const host = process.env.NEXT_PUBLIC_EMULATOR_HOST;
  //   connectAuthEmulator(auth, `http://${host}:9099`);
  //   connectFirestoreEmulator(firestore, host, 8080);
  // }
  
  return {app, auth, firestore};
}

export * from './auth/use-user';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './provider';
export * from './auth/auth';
