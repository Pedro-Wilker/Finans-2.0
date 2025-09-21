import { useSelector } from 'react-redux';
import { type RootState } from '../../store';
import styles from './styles/Profile.module.css';

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return <p className={styles.empty}>Usuário não encontrado.</p>;

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Perfil do Usuário</h2>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {user.phone && <p><strong>Telefone:</strong> {user.phone}</p>}
      {user.profession && <p><strong>Profissão:</strong> {user.profession}</p>}
    </div>
  );
};

export default Profile;
