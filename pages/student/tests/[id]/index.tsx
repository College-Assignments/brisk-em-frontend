import { auth } from '@/src/lib/firebase';
import { addAnswerApi } from '@/src/routes/quiz';
import { getSingleQuiz } from '@/src/services/db';
import { IQuiz } from '@/src/types/quiz';
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
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

function ShowQuiz(quiz: IQuiz, onSubmit: any) {
  return (
    <Container
      maxW="7xl"
      mt={5}
      mb={5}
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      boxShadow="xl"
    >
      <Center flexDirection="column">
        <Heading>{quiz.title}</Heading>
      </Center>
      <Text mt={4}>{quiz.description}</Text>
      <Heading mt={4} size="lg">
        Questions:
      </Heading>
      <Divider
        mt={4}
        mb={4}
        css={{
          boxShadow: '1px 1px #888888',
        }}
      />
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {(props) => (
          <Form>
            {quiz.questions.map((singleQuiz, key) => (
              <Field name={singleQuiz.questionId} key={key}>
                {({ field, _form }: { field: any, _form: any }) => (
                  <FormControl
                    as="fieldset"
                    isRequired={true}
                    mb={{ base: 4, md: 0 }}
                  >
                    <FormLabel as="legend">{singleQuiz.title}</FormLabel>
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
                  </FormControl>
                )}
              </Field>
            ))}
            <Center mt={10}>
              <Button
                type="submit"
                isLoading={props.isSubmitting}
                colorScheme="green"
              >
                Submit
              </Button>
            </Center>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

function SingleQuiz(props: any) {
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
      router.push(`/student/tests/${props.quizId}/answer/${answerId}`);
    } catch (error) {
      console.log('error', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      {quiz && ShowQuiz(quiz, onSubmit)}
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const quizId = context.query.id!;
  const quizData = await getSingleQuiz(quizId);
  return { props: { quiz: quizData, quizId } };
}

export default SingleQuiz;