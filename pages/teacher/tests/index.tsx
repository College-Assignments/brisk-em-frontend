import { getLayout } from '@/src/layouts/teachers-dashboard';
import { Button } from 'antd';
import { useRouter } from 'next/router';

function Users() {
  const router = useRouter();
  function navigateToCreateTest() {
    router.push('/teacher/tests/new');
  }

  return (
    <div>
      <Button type="dashed" onClick={navigateToCreateTest} style={{ width: 240 }}>
        Create Test
      </Button>
    </div>
  );
}

Users.getLayout = getLayout;

export default Users;
