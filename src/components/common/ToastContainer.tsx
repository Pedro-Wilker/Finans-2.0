import { Toaster } from 'react-hot-toast';
import styles from './styles/ToastContainer.module.css';

const ToastContainer = () => <Toaster position="top-right" reverseOrder={false} containerClassName={styles.toaster} />;

export default ToastContainer;