import { AuthFormatted } from '../lib/firebase';
import { getMongo } from '../lib/mongodb';

/**
 *
 * THESE METHODS GET DATA FROM DB
 *
 */
export const getSingleQuiz = async (quizId: string | string[]) => {
    try {
        const { CQuiz } = await getMongo();
        const data = await CQuiz!.findOne({ _id: quizId });
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw Error('Error adding user to database');
    }
};

export const getAllQuiz = async () => {
    try {
        const { CQuiz } = await getMongo();
        const data = await CQuiz!.find({}).toArray();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw Error('Error adding user to database');
    }
};

export const getAnswer = async (answerId: string | string[]) => {
    try {
        const { CAnswer } = await getMongo();
        const data = await CAnswer!.findOne({ _id: answerId });
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw Error('Error adding user to database');
    }
};

export const getAllUsers = async () => {
    try {
        const { CUsers } = await getMongo();
        const data = await CUsers!.find({}).toArray();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw Error('Error adding user to database');
    }
};

/**
 *
 * THESE METHODS MODIFY THE DB
 *
 * DANGER!!!!!!!!!!!!!!!
 *
 */

export const addAnswer = async (data: any) => {
    try {
        const { CAnswer } = await getMongo();
        const response = await CAnswer!.insertOne(data);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw Error('Error adding user to database');
    }
};

export const addUser = async (authUser: AuthFormatted) => {
    try {
        const { CUsers } = await getMongo();
        const data = await CUsers?.findOneAndUpdate(
            { _id: authUser.uid },
            { $set: authUser },
            { upsert: true, returnDocument: 'after' }
        );
        return data;
    } catch (error) {
        console.log(error);
        throw Error('Error adding user to database');
    }
};

// Used by Backend
export const addQuiz = async (quizData: any) => {
    try {
        const { CQuiz } = await getMongo();
        const response = await CQuiz!.insertOne(quizData);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw Error('Error adding user to database');
    }
};
