import RegisterForm from '../components/auth/RegisterForm';
import styles from './styles/Register.module.scss';

const Register = () => (
    <div className={styles.container}>
        <div className={styles.card}>
            <h2 className={styles.title}>Cadastro</h2>
            <RegisterForm />
        </div>
    </div>
);

export default Register;