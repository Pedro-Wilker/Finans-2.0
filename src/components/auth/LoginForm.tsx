import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/validators';
import { login } from '../../services/auth';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import styles from './styles/LoginForm.module.css';

interface LoginFormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
    });
    const navigate = useNavigate();

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data.email, data.password);
            toast.success('Login realizado com sucesso!');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Erro ao realizar login');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Email</label>
                <input {...register('email')} className={styles.input} />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Senha</label>
                <input type="password" {...register('password')} className={styles.input} />
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </div>
            <button type="submit" className={styles.submitButton}>Entrar</button>
            <a href="/forgot-password" className={styles.link}>Esqueceu a senha?</a>
            <Link to="/register" className={styles.registerButton}>Criar uma conta</Link>
        </form>
    );
};

export default LoginForm;