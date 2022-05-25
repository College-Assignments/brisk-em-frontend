import { api } from '@/src/constants/routes';
import { getLayout } from '@/src/layouts/teacher-dashboard';
import { Box, Divider, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

function Tests() {
  const router = useRouter();
  const { data: quiz } = useQuery('quizes', () =>
    fetch(api.getQuiz).then((e) => e?.json() ?? null)
  );

  function navigateToCreateTest() {
    router.push('/teacher/tests/new');
  }

  return (
    <div style={{ minHeight: '360px' }}>
      <Button
        type="dashed"
        onClick={navigateToCreateTest}
        style={{ width: 240 }}
      >
        Create Test
      </Button>

      <br />
      <br />
      <Divider />
      {/* Show Existing Tests */}
      {quiz?.length > 0 ? (
        <div style={{ display: 'grid' }}>
          {quiz.map((singleQuiz: any) => (
            <Box
              key={singleQuiz._id}
              m={1}
              as="button"
              textAlign="start"
              onClick={() => router.push(`/teacher/tests/${singleQuiz._id}`)}
            >
              {GenerateQuizCard(singleQuiz)}
            </Box>
          ))}
        </div>
      ) : (
        <Stack
          justifyContent="center"
          style={{ minHeight: '300px', display: 'flex', alignItems: 'center' }}
        >
          <Spinner size="xl" />
        </Stack>
      )}
    </div>
  );
}

Tests.getLayout = getLayout;

const GenerateQuizCard = (singleQuiz: any) => {
  return (
    <Box
      p={6}
      mt={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="sm"
      bg="white"
    >
      <Heading as="h3" size="md" fontWeight={600}>
        {singleQuiz.title}
      </Heading>

      <Text color="gray.500" mt={2}>
        Posted By: {singleQuiz.user?.name}
      </Text>
      <Text color="gray.500" mt={2}>
        Questions: {singleQuiz.questions.length}
      </Text>

      <Divider mt={3} mb={3} />
      <Text noOfLines={[1, 2, 3]}>{singleQuiz.description}</Text>
    </Box>
  );
};

export default Tests;
