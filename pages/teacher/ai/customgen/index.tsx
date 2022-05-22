import { getLayout } from '@/src/layouts/teacher-dashboard';
import { customGen } from '@/src/routes/ai/customgen';
import { TimeIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, Button, Fade, FormControl, FormLabel, Textarea, useToast } from '@chakra-ui/react';
import { Card } from 'antd';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

function CustomGen() {
  const toast = useToast();

  const [QA, setQA] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function generateQA(values: any, actions: any) {
    try {
      setLoading(true);
      const data = await customGen({ article: values.article });
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
      {/* FORM */}
      <Formik initialValues={{}} onSubmit={generateQA}>
        {(props) => (
          <Form>
            <Field name="article">
              {({ field, _form }: any) => (
                <FormControl isRequired>
                  <FormLabel htmlFor="article">
                    Enter article to generate QA
                  </FormLabel>
                  <Textarea
                    {...field}
                    placeholder="Click to edit"
                    variant="filled"
                  />
                </FormControl>
              )}
            </Field>
            <br />
            <Button
              type="submit"
              width="100%"
              minWidth="160px"
              colorScheme="gray"
              leftIcon={<TimeIcon />}
              isLoading={props.isSubmitting}
              style={{ marginTop: 'auto', borderRadius: 6 }}
            >
              Generate QA
            </Button>
          </Form>
        )}
      </Formik>

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

CustomGen.getLayout = getLayout;

export default CustomGen;
