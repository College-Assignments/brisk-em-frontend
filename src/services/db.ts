import { getMongo } from '../lib/mongodb';

// import { db } from '../lib/firebase';
/**
 *
 * THESE METHODS GET DATA FROM DB
 *
 */
export const getSingleQuiz = async (quizId: string | string[]) => {
  const { CQuiz } = await getMongo();
  const data = await CQuiz!.findOne({ _id: quizId });
  console.log(data);
  return data;
};

export const getAllQuiz = async () => {
  const { CQuiz } = await getMongo();
  const data = await CQuiz!.find({}).toArray();
  console.log(data);
  return data;
};

export const getAnswer = async (answerId: string | string[]) => {
  const { CAnswer } = await getMongo();
  const data = await CAnswer!.findOne({ _id: answerId });
  console.log(data);
  return data;
};

export const getAllUsers = async () => {
  const { CUsers } = await getMongo();
  const data = await CUsers!.find({}).toArray();
  console.log(data);
  return data;
};

/**
 *
 * THESE METHODS MODIFY THE DB
 *
 * DANGER!!!!!!!!!!!!!!!
 *
 */

export const addAnswer = async (data: any) => {
  const { CAnswer } = await getMongo();
  const response = await CAnswer!.insertOne(data);
  console.log(response);
  return;
};

export const addUser = async (authUser: any) => {
  const { CUsers } = await getMongo();
  const user = await CUsers!.findOne({ _id: authUser.uid });
  if (user) {
    await CUsers?.findOneAndUpdate({ _id: authUser.uid }, { $set: authUser });
  } else {
    await CUsers?.insertOne(authUser);
  }
  return;
};

// Used by Backend
export const addQuiz = async (quizData: any) => {
  const { CQuiz } = await getMongo();
  const response = await CQuiz!.insertOne(quizData);
  console.log(response);
  return;
};
