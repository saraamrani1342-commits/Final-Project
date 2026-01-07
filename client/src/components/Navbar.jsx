import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/usersSlice';
import './Navbar.css';

function Navbar() {
  const { token, currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MakeUp Store
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="navbar-link">
              Products
            </Link>
          </li>
          {token ? (
            <>
              <li>
                <Link to="/orders" className="navbar-link">
                  My Orders
                </Link>
              </li>
              {currentUser?.role === 'admin' && (
                <li>
                  <Link to="/users" className="navbar-link">
                    Users
                  </Link>
                </li>
              )}
              <li>
                <span className="navbar-user">
                  {currentUser?.userName || 'User'}
                </span>
              </li>
              <li>
                <button onClick={handleLogout} className="navbar-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="navbar-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

