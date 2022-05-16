import { getLayout } from '@/src/layouts/teachers-dashboard';
import { getAllQuiz, getAllUsers } from '@/src/services/db';
import { Box, Divider, Heading, Text } from '@chakra-ui/react';
import { Button } from 'antd';
import { useRouter } from 'next/router';

function Users(props: any) {
  const router = useRouter();
  const quiz = JSON.parse(props?.quiz);

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


      {/* Show Existing Tests */}
      <div>
        {quiz.length > 0 && (
          <div style={{ display: 'grid' }}>
            {quiz.map((singleQuiz: any) => (
              <Box
                key={singleQuiz.id}
                m={2}
                as="button"
                textAlign="start"
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

Users.getLayout = getLayout;

const generateQuizCard = (singleQuiz: any) => {
  return (
    <Box mt={6} borderWidth="1px" borderRadius="lg" p={6} boxShadow="sm" bg="white">
      <Heading as="h3" size="md" fontWeight={600}>{singleQuiz.title}</Heading>

      <Text color="gray.500" mt={2}>
        Posted By: {singleQuiz.user.name}
      </Text>
      <Text color="gray.500" mt={2}>
        No of Questions: {singleQuiz.questions.length}
      </Text>

      <Divider mt={3} mb={3} />
      <Text noOfLines={[1, 2, 3]}>{singleQuiz.description}</Text>
    </Box>
  );
};

export async function getServerSideProps() {
  const quiz = await getAllQuiz();
  const users = await getAllUsers();
  const data = quiz.map((singleQuiz: any) => {
    return { ...singleQuiz, user: users.find((user) => user.id === singleQuiz.userId) };
  });
  return { props: { quiz: JSON.stringify(data) } };
}

export default Users;
