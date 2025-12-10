'use client';
import {useState, useEffect} from 'react';
import {
  doc,
  onSnapshot,
  type DocumentData,
  type DocumentReference,
} from 'firebase/firestore';
import {useFirestore} from '@/firebase';

export function useDoc<T>(path: string) {
  const firestore = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(firestore, path);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setData({id: snapshot.id, ...snapshot.data()} as T);
      } else {
        setData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore, path]);

  return {data, loading};
}

export function useDocRef<T>(docRef: DocumentReference<DocumentData> | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!docRef) {
      setData(null);
      setLoading(false);
      return;
    }
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setData({id: snapshot.id, ...snapshot.data()} as T);
      } else {
        setData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [docRef]);

  return {data, loading};
}
