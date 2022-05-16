import { getLayout } from '@/src/layouts/teachers-dashboard';
import { Button } from 'antd';

function Users() {
  return (
    <div>
      <Button type="dashed" style={{ width: 240 }}>
        Create Test
      </Button>
    </div>
  );
}

Users.getLayout = getLayout;

export default Users;
