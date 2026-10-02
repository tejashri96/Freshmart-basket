import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore, serverTimestamp, Firestore } from 'firebase/firestore';
import type { Bill, Quantities } from '../domain/pricing';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let database: Firestore | undefined;


function getDatabase(): Firestore {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error('Firebase is not set up. Add your settings to the .env file.');
  }
  if (!database) {
    database = getFirestore(initializeApp(firebaseConfig));
  }
  return database;
}


export async function saveOrder(items: Quantities, bill: Bill): Promise<string> {
  const doc = await addDoc(collection(getDatabase(), 'orders'), {
    items,
    subtotal: bill.subtotal,
    offers: bill.offers,
    totalSavings: bill.totalSavings,
    total: bill.total,
    createdAt: serverTimestamp(),
  });
  return doc.id;
}
