import { addDoc, collection, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore';

import { db } from '../lib/firebase';

/**
 *
 * THESE METHODS GET DATA FROM DB
 *
 */
export const getSingleQuiz = async (quizId: string | string[]) => {
  const docRef = doc(db, 'quiz', String(quizId));
  const snapshot = await getDoc(docRef);
  const quizData = snapshot.exists() ? JSON.stringify(snapshot.data()) : null;
  return quizData;
};

export const getAllQuiz = async () => {
  const q = query(collection(db, 'quiz'));
  const snapshot = await getDocs(q);
  const quiz = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return quiz;
};
export const getAnswer = async (answerId: string | string[]) => {
  const docRef = doc(db, 'answer', String(answerId));
  const snapshot = await getDoc(docRef);
  let answerData = snapshot.exists() ? JSON.stringify(snapshot.data()) : null;
  return answerData;
};

export const getAllUsers = async () => {
  const q = query(collection(db, 'users'));
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return users;
};

/**
 *
 * THESE METHODS MODIFY THE DB
 *
 * DANGER!!!!!!!!!!!!!!!
 *
 */

export const addAnswer = async (data: any) => {
  let response = await addDoc(collection(db, 'answer'), data);
  return response;
};

export const addUser = async (authUser: any) => {
  const resp = await setDoc(
    doc(db, 'users', authUser.uid),
    { ...authUser },
    { merge: true }
  );
  return resp;
};

export const addQuiz = async (quizData: any) => {
  let response = await addDoc(collection(db, 'quiz'), quizData);
  return response;
};