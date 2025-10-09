import { useForm } from 'react-hook-form';
   import { yupResolver } from '@hookform/resolvers/yup';
   import { forgotPasswordSchema } from '../utils/validators';
   import { forgotPassword } from '../services/auth';
   import toast from 'react-hot-toast';
   import styles from './ForgotPassword.module.css';

   interface ForgotPasswordFormData {
     email: string;
   }

   const ForgotPassword = () => {
     const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
       resolver: yupResolver(forgotPasswordSchema),
     });

     const onSubmit = async (data: ForgotPasswordFormData) => {
       try {
         await forgotPassword(data.email);
         toast.success('Código de recuperação enviado!');
       } catch (error) {
         toast.error('Erro ao enviar código');
       }
     };

     return (
       <div className={styles.container}>
         <div className={styles.card}>
           <h2 className={styles.title}>Recuperar Senha</h2>
           <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
             <div className={styles.inputGroup}>
               <label className={styles.label}>Email</label>
               <input {...register('email')} className={styles.input} />
               {errors.email && <p className={styles.error}>{errors.email.message}</p>}
             </div>
             <button type="submit" className={styles.submitButton}>Enviar Código</button>
           </form>
         </div>
       </div>
     );
   };

   export default ForgotPassword;