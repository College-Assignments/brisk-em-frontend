import { getAnswer, getSingleQuiz } from '@/src/services/db';
import style from '@/styles/single-quiz.module.scss';
import { Box, Button, Center, Container, Divider, Heading, Radio, RadioGroup, SimpleGrid, Text } from '@chakra-ui/react';
import { NextPageContext } from 'next';

export default function Answer(props: any) {
  const quiz = JSON.parse(props.quiz);
  const answer = JSON.parse(props.answer);

  return (
    <>
      {quiz && answer && (
        <Container
          mt={20}
          maxW="7xl"
          paddingTop="2rem"
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
          {quiz.questions.map((singleQuiz: any, i: any) => {
            return (
              <Box
                key={i}
                mt={i !== 0 ? 4 : 0}
                backgroundColor={
                  answer.questions[singleQuiz.questionId] &&
                  singleQuiz.options[singleQuiz.answer].optionId ===
                    answer.questions[singleQuiz.questionId]
                    ? '#9ae6b4a8;'
                    : 'red.200'
                }
                className={style.questionBox}
              >
                <Text style={{ fontSize: 16, fontWeight: 800 }}>
                  Q{i + 1}: {singleQuiz.title}
                </Text>
                <RadioGroup
                  defaultValue={singleQuiz.options[singleQuiz.answer].title}
                >
                  <SimpleGrid minChildWidth="120px" mt={2}>
                    {singleQuiz.options.map((option: any, index: any) => (
                      <Radio value={option.title} isDisabled key={index}>
                        {option.title}
                      </Radio>
                    ))}
                  </SimpleGrid>
                </RadioGroup>
                <Text mt={3}>
                  Correct Answer: {singleQuiz.options[singleQuiz.answer].title}
                </Text>
                {answer.questions[singleQuiz.questionId] ? (
                  <Text>
                    Selected Answer:{' '}
                    {
                      singleQuiz.options.find(
                        (option: any) =>
                          option.optionId ===
                          answer.questions[singleQuiz.questionId]
                      ).title
                    }
                  </Text>
                ) : (
                  <Text>Not Answered</Text>
                )}
              </Box>
            );
          })}
          <br />
          <br />
          <Button
            className={style.fancyButton}
            isLoading={props.isSubmitting}
            style={{
              height: '30px',
              borderRadius: 3,
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
      answer: JSON.stringify(answerData),
      quiz: JSON.stringify(quizData),
    },
  };
}

const quizContainerStyle = {
  padding: '3rem',
  borderRadius: 1,
  background: 'url("/images/paper-texture.webp")',
  boxShadow:
    'rgba(50, 50, 93, 0.15) 0px 25px 50px -10px, rgba(0, 0, 0, 0.15) 0px 15px 30px -15px',
};
