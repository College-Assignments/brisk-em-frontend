import { getAnswer, getSingleQuiz } from '@/src/services/db';
import style from '@/styles/single-quiz.module.scss';
import { Box, Button, Center, Container, Divider, Heading, Radio, RadioGroup, SimpleGrid, Text } from '@chakra-ui/react';
import { NextPageContext } from 'next';

export default function Answer(props: any) {
  const quiz = JSON.parse(props.quiz);
  const givenAnswer = JSON.parse(props.answer);

  return (
    <>
      {quiz && givenAnswer && (
        <Container
          mt={20}
          maxW="7xl"
          className={style.container}
          style={quizContainerStyle}
        >
          <Center flexDirection="column">
            <Heading letterSpacing={-2}>
              Corrects Answer for {quiz.title}
            </Heading>
            <Text mt={4}>{quiz.description}</Text>
          </Center>
          <Divider mt="2rem" mb="2rem" />
          {quiz.questions.map((singleQuiz: any, i: any) =>
            AnswerBox({ singleQuiz, givenAnswer, i })
          )}
          <Button
            className={style.fancyButton}
            isLoading={props.isSubmitting}
            style={{
              height: '30px',
              borderRadius: 6,
              marginTop: '4rem',
              minWidth: '10rem',
            }}
          >
            Submit
          </Button>
        </Container>
      )}
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const quizId = context.query.id!;
  const answerId = context.query.answerId!;
  console.log('quizId, answerId => ', context.query);
  const quizData = await getSingleQuiz(quizId);
  const answerData = await getAnswer(answerId);
  return {
    props: {
      quiz: JSON.stringify(quizData),
      answer: JSON.stringify(answerData),
    },
  };
}

function AnswerBox({ singleQuiz, givenAnswer, i }: any) {
  const answerId = givenAnswer.questions[singleQuiz.questionId];
  const answer = singleQuiz.options.find(
    (option: any) => option.optionId === answerId
  );

  return (
    <Box
      key={i}
      mt={i !== 0 ? 4 : 0}
      style={answerBoxStyle}
      className={style.questionBox}
      border={cardBackground(singleQuiz, givenAnswer)}
    >
      <Text style={{ fontSize: 16, fontWeight: 800 }}>
        Q{i + 1}: {singleQuiz.title}
      </Text>
      <RadioGroup defaultValue={answer.title}>
        <SimpleGrid minChildWidth="120px" mt={2}>
          {singleQuiz.options.map((option: any, index: any) => {
            return (
              <Radio value={option.title} isDisabled key={index}>
                {option.title}
              </Radio>
            );
          })}
        </SimpleGrid>
      </RadioGroup>
      <Text mt={3}>
        Correct Answer: {singleQuiz.options[singleQuiz.answer].title}
      </Text>
      {givenAnswer.questions[singleQuiz.questionId] ? (
        <Text>
          Selected Answer:{' '}
          {
            singleQuiz.options.find(
              (option: any) =>
                option.optionId === givenAnswer.questions[singleQuiz.questionId]
            ).title
          }
        </Text>
      ) : (
        <Text>Not Answered</Text>
      )}
    </Box>
  );
}

function cardBackground(singleQuiz: any, givenAnswer: any) {
  return givenAnswer.questions[singleQuiz.questionId] &&
    singleQuiz.options[singleQuiz.answer].optionId ===
      givenAnswer.questions[singleQuiz.questionId]
    ? '1px solid #52ff8f80;'
    : '1px solid #ff72727a';
}

const quizContainerStyle = {
  padding: '3rem',
  borderRadius: 1,
  background: 'url("/images/paper-texture.webp")',
  boxShadow:
    'rgba(50, 50, 93, 0.15) 0px 25px 50px -10px, rgba(0, 0, 0, 0.15) 0px 15px 30px -15px',
};

const answerBoxStyle = {
  padding: '1rem',
  background: '#fefefeec',
};
