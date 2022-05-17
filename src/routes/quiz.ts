import axios from 'axios';

export const addQuizApi = async (auth: any, values: any) => {
  try {
    const header = {
      'Content-Type': 'application/json',
      token: auth.token,
    };
    const resp = await axios.post('/api/quiz', values, { headers: header });
    return resp;
  } catch (error) {
    throw error;
  }
};

export const addAnswerApi = async (token: string, quizId: any, values: any) => {
  try {
    const header = {
      'Content-Type': 'application/json',
      token: token,
    };
    const resp = await axios.post(
      `/api/quiz/${quizId}/answer`,
      {
        questions: values,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { headers: header }
    );
    return resp;
  } catch (error) {
    throw error;
  }
};
