import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from '../utils/validators';
import { resetPassword } from '../services/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/common/Modal';
import styles from './styles/ResetCodeModal.module.css';

interface ResetPasswordFormData {
    email: string;
    code: string;
    newPassword: string;
}

const ResetCodeModal = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
        resolver: yupResolver(resetPasswordSchema),
    });
    const navigate = useNavigate();

    const onSubmit = async (data: ResetPasswordFormData) => {
        try {
            await resetPassword(data.email, data.code, data.newPassword);
            toast.success('Senha redefinida com sucesso!');
            navigate('/login');
        } catch (error) {
            toast.error('Erro ao redefinir senha');
        }
    };

    return (
        <Modal isOpen={true} onClose={() => navigate('/login')}>
            <h2 className={styles.title}>Redefinir Senha</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Email</label>
                    <input {...register('email')} className={styles.input} />
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Código</label>
                    <input {...register('code')} className={styles.input} />
                    {errors.code && <p className={styles.error}>{errors.code.message}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Nova Senha</label>
                    <input type="password" {...register('newPassword')} className={styles.input} />
                    {errors.newPassword && <p className={styles.error}>{errors.newPassword.message}</p>}
                </div>
                <button type="submit" className={styles.submitButton}>Redefinir</button>
            </form>
        </Modal>
    );
};

export default ResetCodeModal;