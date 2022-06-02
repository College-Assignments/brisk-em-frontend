import { BASE_URL } from '@/src/constants/base';
import { api } from '@/src/constants/routes';
import { getLayout } from '@/src/layouts/teacher-dashboard';
import React, { ReactNode, useEffect } from 'react';

function TestAction({ quiz }: any) {
  return <pre>{JSON.stringify(quiz, null, 4)}</pre>;
}

export async function getServerSideProps(context: any) {
  const { id } = context.params ?? null;

  if (!id) {
    return {
      props: {
        error: 'No ID provided',
      },
    };
  }

  try {
    const data = await fetch(`${BASE_URL}${api.getQuiz}?quizId=${id}`);
    const quiz = await data.json();
    return { props: { quiz } };
  } catch (error: any) {
    console.log(error);
    return {
      props: {
        error: error.message,
      },
    };
  }
}

TestAction.getLayout = getLayout;

export default TestAction;
