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
        borderColor: '#d0d0d0',
        boxShadow: 'rgba(17, 17, 26, 0.05) 0px 0px 16px',
        transition: 'all 0.12s cubic-bezier(0.45, 0.05, 0.55, 0.95) 0s',
      }}
      _hover={{
        cursor: 'pointer',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px !important',
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
