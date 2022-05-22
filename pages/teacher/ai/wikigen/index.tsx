import { getLayout } from '@/src/layouts/teacher-dashboard';
import { wikigen, wikisearch } from '@/src/routes/ai/wikigen';
import { Search2Icon, TimeIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, Button, Fade, FormControl, FormLabel, Input, Select, Stack, useToast } from '@chakra-ui/react';
import { Card } from 'antd';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

function WikiGen() {
  const toast = useToast();

  const [topics, setTopics] = useState<string[]>([]);
  const [QA, setQA] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function searchTopic(values: any, actions: any) {
    const data = await wikisearch({ searchQuery: values.search });
    setTopics(data);
    actions.setSubmitting(false);
  }

  async function generateQA(values: any, actions: any) {
    try {
      setLoading(true);
      const data = await wikigen({ topic: values.topic });
      setQA(data);
      setLoading(false);
      actions.setSubmitting(false);
    } catch (err) {
      console.log(err);
      toast({
        status: 'error',
        isClosable: true,
        position: 'bottom',
        title: 'Error Occured, Please Report to Admin',
      });
      setLoading(false);
      actions.setSubmitting(false);
    }
  }

  return (
    <Card style={{ borderRadius: 8 }}>
      <Formik initialValues={{ search: 'Himalayas' }} onSubmit={searchTopic}>
        {(props) => (
          <Form>
            <Stack direction="row" spacing={4}>
              <Field name="search">
                {({ field, _form }: any) => (
                  <FormControl isRequired>
                    <FormLabel htmlFor="search">
                      Search for Wikipedia Topic
                    </FormLabel>
                    <Input {...field} id="search" placeholder="search" />
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                type="submit"
                minWidth="160px"
                leftIcon={<Search2Icon />}
                colorScheme="gray"
                style={{ marginTop: 'auto', borderRadius: 6 }}
                isLoading={props.isSubmitting}
              >
                Search
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>

      <br />
      {/* FORM 2 */}
      {topics.length > 0 && (
        <Formik initialValues={{}} onSubmit={generateQA}>
          {(props) => (
            <Form>
              <Stack direction="row" spacing={4}>
                <Field name="topic">
                  {({ field, _form }: any) => (
                    <FormControl isRequired>
                      <FormLabel htmlFor="topic">
                        Select to Generate QA
                      </FormLabel>
                      <Select {...field} placeholder="Select any topic">
                        {topics.map((topic: any, i: any) => {
                          return (
                            <option key={i} value={topic}>
                              {topic}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  type="submit"
                  minWidth="160px"
                  colorScheme="gray"
                  leftIcon={<TimeIcon />}
                  isLoading={props.isSubmitting}
                  style={{ marginTop: 'auto', borderRadius: 6 }}
                >
                  Generate QA
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      )}

      {loading && (
        <>
          <br />
          <Fade in={loading}>
            <Alert status="warning" borderRadius={8}>
              <AlertIcon />
              Generating QA takes time. Please be patient.
            </Alert>
          </Fade>
        </>
      )}

      {/* RESULT */}
      {QA && (
        <div>
          <br />
          <br />
          <h3
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: '#333',
              fontFamily: 'Overpass',
            }}
          >
            Generated Questions
          </h3>
          <br />
          {QA.map((item: { question: string; answer: string }) => (
            <Card
              key={item.question}
              style={{
                border: 'none',
                borderRadius: 8,
                marginBottom: 12,
                fontFamily: 'Overpass',
                boxShadow:
                  'rgba(0, 0, 0, 0.04) 0px 6px 24px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px',
              }}
            >
              <span style={{ fontSize: 18 }}>{item.question}</span>
              <p style={{ color: '#666', fontSize: 16 }}>{item.answer}</p>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}

WikiGen.getLayout = getLayout;

export default WikiGen;
