'use client';

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export async function signInWithEmail(email: string, password: string):Promise<void> {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser(): Promise<void> {
  const auth = getAuth();
  await signOut(auth);
}
