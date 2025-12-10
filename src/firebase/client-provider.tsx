'use client';

import {useState, type ReactNode} from 'react';
import {type FirebaseApp} from 'firebase/app';
import {type Auth} from 'firebase/auth';
import {type Firestore} from 'firebase/firestore';
import {initializeFirebase, FirebaseProvider} from '@/firebase';

export function FirebaseClientProvider({children}: {children: ReactNode}) {
  const [firebase, setFirebase] = useState<{
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
  } | null>(null);

  if (!firebase) {
    setFirebase(initializeFirebase());
    return null;
  }

  return (
    <FirebaseProvider
      app={firebase.app}
      auth={firebase.auth}
      firestore={firebase.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
