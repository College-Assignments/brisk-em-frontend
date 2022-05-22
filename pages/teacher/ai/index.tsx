import { getLayout } from '@/src/layouts/teacher-dashboard';
import { Box, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';

function AI() {
  const options = [
    {
      link: '/wikigen',
      title: 'Wikipedia QA Generator',
      imageUrl: '/images/wikipedia.png',
      description:
        'Generates Questions and Answers from Wikipedia Articles Using Artificial Intelligence',
    },
    {
      link: '/customgen',
      title: 'Custom QA Generator',
      imageUrl: '/images/custom.jpg',
      description:
        'Generates Questions and Answers from Manually Entered Article Using Artificial Intelligence',
    },
  ];

  return (
    <div style={{ display: 'flex', gap: 50 }}>
      {options.map((option) => GenCard(option))}
    </div>
  );
}

function GenCard({ title, imageUrl, description, link }: any) {
  const router = useRouter();

  return (
    <Box
      key={link}
      style={{
        transition: 'all 0.15s ease-in-out',
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)',
      }}
      _hover={{
        cursor: 'pointer',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1) !important',
      }}
      maxW="sm"
      minW={320}
      borderWidth="1px"
      borderRadius="lg"
      onClick={() => router.push(`/teacher/ai/${link}`)}
    >
      <Image minH={350} objectFit="cover" opacity={0.8} src={imageUrl} alt="" />
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {title}
        </Box>

        <Box>{description}</Box>
      </Box>
    </Box>
  );
}

AI.getLayout = getLayout;

export default AI;
