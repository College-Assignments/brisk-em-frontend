import { api } from '@/src/constants/routes';
import { getLayout } from '@/src/layouts/teacher-dashboard';
import { errToast } from '@/src/services/toast';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import { useQuery } from 'react-query';

function TestAction() {
  const router = useRouter();
  const { id } = router.query ?? null;
  const toast = useToast();
  const {
    data: quiz,
    error,
    refetch,
    isRefetchError,
    remove,
  } = useQuery(
    'quiz',
    () => fetch(`${api.getQuiz}?quizId=${id}`).then((e) => e?.json() ?? null),
    { enabled: false }
  );

  useEffect(() => {
    console.log(error, isRefetchError, router.query.id);
    if (router.isReady && !router.query.id) router.push('/teacher/tests');
    else if (router.isReady) {
      refetch();
      if (isRefetchError && error) {
        errToast(toast);
        router.push('/teacher/tests');
      }
    }

    return () => remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <pre>{JSON.stringify(quiz, null, 4)}</pre>;
}

TestAction.getLayout = getLayout;

export default TestAction;
