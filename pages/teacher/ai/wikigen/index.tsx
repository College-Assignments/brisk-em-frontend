import { getLayout } from '@/src/layouts/teacher-dashboard';
import { wikigen, wikisearch } from '@/src/routes/ai/wikigen';
import { Search2Icon, TimeIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormLabel, Input, Select, Stack } from '@chakra-ui/react';
import { Card } from 'antd';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

function WikiGen() {
  const [topics, setTopics] = useState<string[]>([]);
  const [QA, setQA] = useState<any>(null);

  async function searchTopic(values: any, actions: any) {
    const data = await wikisearch({ searchQuery: values.search });
    setTopics(data);
    actions.setSubmitting(false);
  }

  async function generateQA(values: any, actions: any) {
    const data = await wikigen({ topic: values.topic });
    console.log(data);
    setQA(data);
    actions.setSubmitting(false);
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
                  style={{ marginTop: 'auto', borderRadius: 6 }}
                  isLoading={props.isSubmitting}
                >
                  Generate QA
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      )}

      <br />
      <br />
      {/* RESULT */}
      {QA && (
        <pre>
          <code>{JSON.stringify(QA, null, 2)}</code>
        </pre>
      )}
    </Card>
  );
}

WikiGen.getLayout = getLayout;

export default WikiGen;
