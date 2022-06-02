import { auth } from '@/src/lib/firebase';
import { addAnswerApi } from '@/src/routes/quiz';
import { getSingleQuiz } from '@/src/services/db';
import { IQuiz } from '@/src/types/quiz';
import style from '@/styles/single-quiz.module.scss';
import {
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  RadioGroup,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function SingleQuiz(props: any) {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push(`/signin?next=/student/tests/${props.quizId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const quiz = JSON.parse(props.quiz);

  const onSubmit = async (values: any, actions: any) => {
    try {
      const token = await user?.getIdToken();
      if (!token) {
        alert('Invalid token, please relogin');
        return;
      }
      const resp = await addAnswerApi(token, props.quizId, values);
      const answerId = resp.data.data.answerId;
      router.push(`/student/tests/${props.quizId}/${answerId}`);
    } catch (error) {
      console.log('error', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return <>{quiz && ShowQuiz(quiz, onSubmit)}</>;
}

function ShowQuiz(quiz: IQuiz, onSubmit: any) {
  return (
    <>
      <Script src="/scripts/script.js" />
      <Container
        mt={20}
        maxW="7xl"
        paddingTop="2rem"
        className={style.container}
        style={quizContainerStyle}
      >
        <Center flexDirection="column">
          <Heading>{quiz.title}</Heading>
          <Text mt={4}>{quiz.description}</Text>
        </Center>
        <Divider mt="2rem" mb="2rem" />
        <Formik initialValues={{}} onSubmit={onSubmit}>
          {(props) => (
            <Form>
              {quiz.questions.map((singleQuiz, key) => (
                <Field name={singleQuiz.questionId} key={key}>
                  {({ field, _form }: { field: any; _form: any }) => (
                    <FormControl
                      as="fieldset"
                      isRequired={true}
                      mb={{ base: 4, md: 0 }}
                    >
                      <FormLabel as="legend">
                        {`Q${key + 1}: ${singleQuiz.title}`}
                      </FormLabel>
                      <RadioGroup>
                        <SimpleGrid minChildWidth="120px" mb={2}>
                          {singleQuiz.options.map((option, subkey) => (
                            <HStack key={subkey}>
                              <Field
                                {...field}
                                type="radio"
                                name={singleQuiz.questionId}
                                value={option.optionId}
                              />
                              <Text>{option.title}</Text>
                            </HStack>
                          ))}
                        </SimpleGrid>
                      </RadioGroup>
                      <br />
                      <br />
                    </FormControl>
                  )}
                </Field>
              ))}
              <Center mt={10}>
                <Button
                  type="submit"
                  className={style.fancyButton}
                  isLoading={props.isSubmitting}
                  style={{
                    height: '30px',
                    borderRadius: 3,
                  }}
                >
                  Submit
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const quizId = context.query.id!;
  const quizData = await getSingleQuiz(quizId);
  return { props: { quiz: JSON.stringify(quizData), quizId } };
}

const quizContainerStyle = {
  padding: '3rem',
  borderRadius: 1,
  background: 'url("/images/paper-texture.webp")',
  boxShadow:
    'rgba(50, 50, 93, 0.15) 0px 25px 50px -10px, rgba(0, 0, 0, 0.15) 0px 15px 30px -15px',
};
