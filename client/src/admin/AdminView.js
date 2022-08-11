import { Admin, Resource, ListGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import UserList from './UserList';

const AdminView = () => {

    return (
            <Admin dataProvider={simpleRestProvider('http://localhost:3050/api/users')}>
               <Resource
                name='Users' list={ListGuesser}
              />
{/*                <Resource
                name='users'
                list={UserList}
              /> */}
            </Admin>
          )
}

export default AdminView;