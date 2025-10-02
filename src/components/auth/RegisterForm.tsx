import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../utils/validators';
import { register as registerUser } from '../../services/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styles from './styles/RegisterForm.module.css';
import * as yup from 'yup';

// Derive RegisterFormData from registerSchema's inferred type
type RegisterFormData = yup.InferType<typeof registerSchema> & {
  profile_photo?: FileList;
};

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema) as any, // Type cast to bypass resolver type mismatch
    });
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('password', data.password);
            if (data.phone) formData.append('phone', data.phone);
            if (data.profession) formData.append('profession', data.profession);
            if (data.profile_photo && data.profile_photo[0]) {
                formData.append('profile_photo', data.profile_photo[0]);
            }

            await registerUser(formData);
            toast.success('Cadastro realizado com sucesso!');
            navigate('/dashboard');
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Erro ao realizar cadastro';
            toast.error(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Nome</label>
                <input {...register('name')} className={styles.input} />
                {errors.name && <p className={styles.error}>{errors.name.message}</p>}
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Email</label>
                <input {...register('email')} className={styles.input} />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Telefone (opcional)</label>
                <input {...register('phone')} className={styles.input} />
                {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Profissão (opcional)</label>
                <input {...register('profession')} className={styles.input} />
                {errors.profession && <p className={styles.error}>{errors.profession.message}</p>}
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Foto de Perfil (opcional)</label>
                <input type="file" accept="image/*" {...register('profile_photo')} className={styles.input} />
                {errors.profile_photo && <p className={styles.error}>{errors.profile_photo.message}</p>}
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Senha</label>
                <input type="password" {...register('password')} className={styles.input} />
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </div>
            <button type="submit" className={styles.submitButton}>Cadastrar</button>
        </form>
    );
};

export default RegisterForm;