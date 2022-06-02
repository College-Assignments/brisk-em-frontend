import { getLayout } from '@/src/layouts/student-dashboard';
import { getAllQuiz } from '@/src/services/db';
import { Box, Divider, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

function Users(props: any) {
  const router = useRouter();
  const quiz = JSON.parse(props?.quiz);

  return (
    <div>
      {quiz.length > 0 && (
        <div style={{ display: 'grid' }}>
          {quiz.map((singleQuiz: any) => (
            <Box
              key={singleQuiz._id}
              m={2}
              as="button"
              textAlign="start"
              onClick={() => router.push(`/student/tests/${singleQuiz._id}`)}
            >
              {quizCard(singleQuiz)}
            </Box>
          ))}
        </div>
      )}
    </div>
  );
}

Users.getLayout = getLayout;

const quizCard = (singleQuiz: any) => {
  return (
    <Box
      mt={2}
      borderWidth="1px"
      borderRadius="lg"
      p={6}
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

export async function getServerSideProps() {
  const quiz = await getAllQuiz();
  return { props: { quiz: JSON.stringify(quiz) } };
}

export default Users;
