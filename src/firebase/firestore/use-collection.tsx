'use client';
import {useState, useEffect} from 'react';
import {
  collection,
  onSnapshot,
  type DocumentData,
  type Query,
} from 'firebase/firestore';
import {useFirestore} from '@/firebase';

export function useCollection<T>(path: string) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = collection(firestore, path);
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const data: T[] = [];
      snapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()} as T);
      });
      setData(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore, path]);

  return {data, loading};
}

export function useCollectionQuery<T>(query: Query | null) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setData([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(query, (snapshot) => {
      const data: T[] = [];
      snapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()} as T);
      });
      setData(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [query]);

  return {data, loading};
}
