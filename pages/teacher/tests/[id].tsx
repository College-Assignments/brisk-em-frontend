import { BASE_URL } from '@/src/constants/base';
import { api } from '@/src/constants/routes';
import { getLayout } from '@/src/layouts/teacher-dashboard';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Card } from 'antd';
import React, { ReactNode, useEffect } from 'react';

function TestAction({ quiz }: any) {
  return (
    <Card style={{ borderRadius: 12 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, color: '#424242' }}>
        {quiz.title}
      </h1>
      <p style={{ fontSize: 18, fontWeight: 400, color: '#585858' }}>
        {quiz.description}
      </p>
      {quiz.questions.map((question: any, i: number) => Question(question, i))}
    </Card>
  );
}

function Question(question: any, i: number) {
  return (
    <Card key={i} style={{ marginTop: '1rem', borderRadius: 12 }}>
      <h1 style={{ fontSize: 22, fontWeight: 500, color: '#424242' }}>
        Q{i + 1}: {question.title}
      </h1>
      <br />
      <RadioGroup
        name={`question-${i}`}
        display="flex"
        gap={14}
        defaultValue={question.options[question.answer].title}
      >
        {question.options.map((answer: any, j: number) => {
          return (
            <Radio key={j} value={answer.title} isDisabled>
              {answer.title}
            </Radio>
          );
        })}
      </RadioGroup>
    </Card>
  );
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
