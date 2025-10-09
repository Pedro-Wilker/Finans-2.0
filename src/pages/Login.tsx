import LoginForm from '../components/auth/LoginForm';
   import styles from './Login.module.css';

   const Login = () => (
     <div className={styles.container}>
       <div className={styles.card}>
         <h2 className={styles.title}>Login</h2>
         <LoginForm />
       </div>
     </div>
   );

   export default Login;