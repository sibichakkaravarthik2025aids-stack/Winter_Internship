import { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const getUsers = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        );

        if (isActive) {
          setUsers(response.data);
        }
      } catch {
        if (isActive) {
          setError('Unable to load users. Please try again later.');
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    getUsers();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="users-section">
      <h2>User Names</h2>

      {isLoading && <p>Loading users...</p>}
      {error && <p role="alert">{error}</p>}

      {!isLoading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Users;