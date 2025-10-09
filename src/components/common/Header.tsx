import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type RootState } from '../../store';
import { logout } from '../../store/authSlice';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Finans 2.0</h1>
      </div>
      {user && (
        <div className={styles.userActions}>
          <span>{user.name}</span>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Sair
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;