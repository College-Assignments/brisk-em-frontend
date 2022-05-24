import { BASE_URL } from '@/src/constants/base';
import { api } from '@/src/constants/routes';
import { getLayout } from '@/src/layouts/teacher-dashboard';
import { Box, Divider, Heading, Text } from '@chakra-ui/react';
import { Button } from 'antd';
import { useRouter } from 'next/router';

function Tests(props: any) {
  const router = useRouter();
  const quiz = JSON.parse(props.quiz);

  function navigateToCreateTest() {
    router.push('/teacher/tests/new');
  }

  return (
    <div>
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
      <div>
        {quiz?.length > 0 && (
          <div style={{ display: 'grid' }}>
            {quiz.map((singleQuiz: any) => (
              <Box
                key={singleQuiz.id}
                m={1}
                as="button"
                textAlign="start"
                // TODO: Change here to edit quiz
                onClick={() => router.push(`/quiz/${singleQuiz.id}`)}
              >
                {generateQuizCard(singleQuiz)}
              </Box>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

Tests.getLayout = getLayout;

export async function getServerSideProps() {
  try {
    const quiz = await fetch(BASE_URL + api.getQuiz).then((res) => res.json());
    const users = await fetch(BASE_URL + api.getUser).then((res) => res.json());
    const data = quiz.map((singleQuiz: any) => {
      return {
        ...singleQuiz,
        user: users?.find((user: any) => user.uid === singleQuiz.userId),
      };
    });
    return { props: { quiz: JSON.stringify(data) } };
  } catch (error) {
    console.log('Server Sided Error', error);
    return { props: { quiz: null } };
  }
}

const generateQuizCard = (singleQuiz: any) => {
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
