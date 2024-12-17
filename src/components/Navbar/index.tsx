import { NavLink, useNavigate } from 'react-router-dom';
import { IoPersonCircle } from 'react-icons/io5';
import { BiSolidHomeAlt2 } from 'react-icons/bi';
import Logo from '../../assets/Logo.png';
import {
  meLocalStorage,
  removeLocalStorage,
} from '../../services/localStorage';
const Navbar = () => {
  const token = meLocalStorage('token');
  const isAuth = !!token;
  const navigate = useNavigate();

  const handleLogout = () => {
    removeLocalStorage('token');
    navigate('/');
    alert('Thank you for using our app!');
  };

  return (
    <nav className="bg-tertiary p-4">
      <ul className="flex flex-wrap items-center justify-between">
        {/* Logo */}
        <li className="flex-shrink-0">
          <NavLink to="/">
            <img src={Logo} alt="Logo" className="w-20 rounded-full" />
          </NavLink>
        </li>

        {/* Navigation items centered */}
        <div className="flex space-x-4">
          <li>
            <NavLink to="/" className="text-2xl text-secondary">
              <BiSolidHomeAlt2 />
            </NavLink>
          </li>
          {isAuth ? (
            <>
              <li>
                <NavLink to="/profile" className="text-2xl text-secondary">
                  <IoPersonCircle />
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="text-secondary">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className="text-secondary">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="text-secondary">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
