import { ObjectId } from 'mongodb';

import { getMongo } from '../lib/mongodb';
import { AuthFormatted } from '../types/common';

/**
 *
 * THESE METHODS GET DATA FROM DB
 *
 */
export const getSingleQuiz = async (quizId: string | string[]) => {
  try {
    const { CQuiz } = await getMongo();
    console.log(CQuiz);
    const data = await CQuiz?.findOne({ _id: new ObjectId(String(quizId)) });
    console.log('Single Quiz -> ', data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error('Unhandled Error');
  }
};

export const getAllQuiz = async () => {
  try {
    const { CQuiz } = await getMongo();
    const data = await CQuiz?.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
    ]).toArray();
    console.log('All Quiz -> ', data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error('Unhandled Error');
  }
};

export const getAnswer = async (answerId: string | string[]) => {
  try {
    const { CAnswer } = await getMongo();
    const data = await CAnswer?.findOne({
      _id: new ObjectId(String(answerId)),
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error('Unhandled Error');
  }
};

export const getAllUsers = async () => {
  try {
    const { CUsers } = await getMongo();
    const data = await CUsers?.find().toArray();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error('Unhandled Error');
  }
};

/**
 *
 * THESE METHODS MODIFY THE DB
 *
 * DANGER???????????????
 *
 */

export const addAnswer = async (data: any) => {
  try {
    const { CAnswer } = await getMongo();
    const response = await CAnswer?.insertOne(data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw Error('Unhandled Error');
  }
};

export const addUser = async (authUser: AuthFormatted) => {
  try {
    const { CUsers } = await getMongo();
    const data = await CUsers?.findOneAndUpdate(
      { _id: new ObjectId(String(authUser.uid)) },
      { $set: authUser },
      { upsert: true, returnDocument: 'after' }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw Error('Unhandled Error');
  }
};

// Used by Backend
export const addQuiz = async (quizData: any) => {
  try {
    const { CQuiz } = await getMongo();
    const response = await CQuiz?.insertOne(quizData);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw Error('Unhandled Error');
  }
};
