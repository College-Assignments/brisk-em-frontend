import { answerOption, optionData } from '@/src/constants/new-test';
import { getLayout } from '@/src/layouts/teacher-dashboard';
import { auth } from '@/src/lib/firebase';
import { addQuizApi } from '@/src/routes/quiz';
import { successToast } from '@/src/services/toast';
import { formValidationSchema } from '@/src/types/yup-validation';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Field, FieldArray, Form, Formik, getIn } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 as uuidv4 } from 'uuid';

const NewTest = () => {
  const toast = useToast();
  const router = useRouter();

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!user && !loading) {
      router.push('/signin?next=/teacher/tests/new');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const questionsData = {
    title: '',
    options: [{ title: '' }, { title: '' }, { title: '' }, { title: '' }],
    answer: '0',
  };

  const initialValues = {
    title: '',
    description: '',
    questions: [questionsData],
  };

  const submitHandler = async (values: any, actions: any) => {
    try {
      values = {
        ...values,
        createdAt: new Date(),
        updatedAt: new Date(),
        questions: values.questions.map((question: any) => {
          return {
            ...question,
            options: question.options.map((option: any) => {
              return { ...option, optionId: uuidv4() };
            }),
            questionId: uuidv4(),
          };
        }),
      };
      console.log(values);
      const token = await user!.getIdToken();
      await addQuizApi(token, values);
      successToast(toast);
      router.push('/teacher/tests');
    } catch (error) {
      console.log('error', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Container
        maxW="3xl"
        mt={5}
        mb={5}
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        boxShadow="xl"
        bg={'white'}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={formValidationSchema}
        >
          {(props) => (
            <Form>
              <Field name="title">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.title && form.touched.title}
                  >
                    <FormLabel htmlFor="title" fontSize="xl">
                      Quiz Title
                    </FormLabel>
                    <Input {...field} id="title" />
                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="description">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={
                      form.errors.description && form.touched.description
                    }
                  >
                    <FormLabel htmlFor="description" fontSize="xl" mt={4}>
                      Quiz description
                    </FormLabel>
                    <Textarea {...field} id="description" />
                    <FormErrorMessage>
                      {form.errors.description}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="questions">
                {({ field }: any) => (
                  <FormControl>
                    <FormLabel htmlFor="questions" fontSize="xl" mt={4}>
                      Enter your question data:
                    </FormLabel>
                    <Box mt={4}>
                      <FieldArray {...field} name="questions" id="questions">
                        {(fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps;
                          const { values, errors, touched } = form;
                          const { questions } = values;
                          const errorHandler = (name: any) => {
                            const error = getIn(errors, name);
                            const touch = getIn(touched, name);
                            return touch && error ? error : null;
                          };
                          return (
                            <div>
                              {questions.map((_question: any, index: any) => {
                                return (
                                  <Flex key={index} direction="column">
                                    <FormControl
                                      isInvalid={errorHandler(
                                        `questions[${index}][title]`
                                      )}
                                    >
                                      <FormLabel
                                        htmlFor={`questions[${index}][title]`}
                                      >
                                        Question Title:
                                      </FormLabel>
                                      <Input
                                        name={`questions[${index}][title]`}
                                        as={Field}
                                        mb={
                                          (!errorHandler(
                                            `questions[${index}][title]`
                                          ) && 3) as any
                                        }
                                      />
                                      <FormErrorMessage>
                                        {errorHandler(
                                          `questions[${index}][title]`
                                        )}
                                      </FormErrorMessage>
                                    </FormControl>
                                    <SimpleGrid
                                      minChildWidth="300px"
                                      spacing="10px"
                                      mb={{
                                        base: 4,
                                      }}
                                    >
                                      {optionData.map((option, subIndex) => (
                                        <FormControl
                                          mb={2}
                                          key={subIndex}
                                          isInvalid={errorHandler(
                                            `questions[${index}][options][${subIndex}].title`
                                          )}
                                        >
                                          <FormLabel
                                            htmlFor={`questions[${index}][options][${subIndex}].title`}
                                          >
                                            {option.label}
                                          </FormLabel>
                                          <Input
                                            name={`questions[${index}][options][${subIndex}].title`}
                                            as={Field}
                                          />
                                          <FormErrorMessage>
                                            {errorHandler(
                                              `questions[${index}][options][${subIndex}].title`
                                            )}
                                          </FormErrorMessage>
                                        </FormControl>
                                      ))}
                                    </SimpleGrid>
                                    <Box>
                                      <Text mb="8px">Correct Answer:</Text>
                                      <Field
                                        component="select"
                                        name={`questions[${index}][answer]`}
                                        style={{
                                          width: '100%',
                                          padding: '10px',
                                          border: '1px solid #eaeaea',
                                          borderRadius: '6px',
                                        }}
                                      >
                                        {answerOption.map((value, key) => (
                                          <option
                                            value={value.answer}
                                            key={key}
                                          >
                                            {value.label}
                                          </option>
                                        ))}
                                      </Field>
                                    </Box>
                                    <Flex
                                      direction="row"
                                      justify="flex-end"
                                      mt={4}
                                    >
                                      {index > 0 && (
                                        <IconButton
                                          onClick={() => remove(index)}
                                          aria-label="Remove Question"
                                          icon={<MinusIcon />}
                                          variant="ghost"
                                        >
                                          -
                                        </IconButton>
                                      )}
                                      {index === questions.length - 1 && (
                                        <IconButton
                                          onClick={() => push(questionsData)}
                                          width="full"
                                          aria-label="Add Question"
                                          icon={<AddIcon />}
                                          variant="solid"
                                          marginBottom={4}
                                        >
                                          +
                                        </IconButton>
                                      )}
                                    </Flex>
                                    {index !== questions.length - 1 && (
                                      <Divider
                                        mt={4}
                                        mb={6}
                                        css={{
                                          borderRadius: '6px',
                                          boxShadow: '1px 1px #dfdfdf',
                                        }}
                                      />
                                    )}
                                  </Flex>
                                );
                              })}
                            </div>
                          );
                        }}
                      </FieldArray>
                    </Box>
                  </FormControl>
                )}
              </Field>
              <Center>
                <Button
                  type="submit"
                  width="full"
                  colorScheme="green"
                  isLoading={props.isSubmitting}
                  disabled={!(props.isValid && props.dirty)}
                >
                  Submit Quiz
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

NewTest.getLayout = getLayout;

export default NewTest;
