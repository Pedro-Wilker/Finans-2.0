import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../utils/validators';
import { register as registerUser } from '../../services/auth'; 
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styles from './styles/RegisterForm.module.scss';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phone?: string; // Optional
  profession?: string; // Optional
}

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data); 
      toast.success('Cadastro realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Erro ao realizar cadastro');
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
        <label className={styles.label}>Senha</label>
        <input type="password" {...register('password')} className={styles.input} />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
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
      <button type="submit" className={styles.submitButton}>Cadastrar</button>
    </form>
  );
};

export default RegisterForm;