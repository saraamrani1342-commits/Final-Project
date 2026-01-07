import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/slices/usersSlice';
import './Users.css';

function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { token, currentUser } = useSelector((state) => state.users);

  useEffect(() => {
    if (token && currentUser?.role === 'admin') {
      dispatch(fetchUsers(token));
    }
  }, [dispatch, token, currentUser]);

  if (currentUser?.role !== 'admin') {
    return <div className="error">Access denied. Admin only.</div>;
  }

  return (
    <div className="users">
      <h1>Users</h1>
      <div className="users-list">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <h3>{user.userName}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;

