import { getLayout } from '@/src/layouts/teachers-dashboard';
import { Space, Table } from 'antd';
import { useEffect } from 'react';

const { Column } = Table;

const data = [
  {
    key: '1',
    firstName: 'John',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

function Users() {
  // const { isLoading, error, data } = useQuery<boolean, Error, any>('users', () =>
  //   fetch('/api/users').then((res) => res.json())
  // );

  useEffect(() => {
    async function getData() {
      const res = await fetch('/api/users');
      const data = await res.json();
      console.log(data);
    }
    getData();
  }, []);

  return (
    <Table dataSource={data}>
      <Column title="Name" dataIndex="firstName" key="firstName" />
      <Column title="Age" dataIndex="age" key="age" />
      <Column title="Address" dataIndex="address" key="address" />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
  );
}

Users.getLayout = getLayout;

export default Users;
