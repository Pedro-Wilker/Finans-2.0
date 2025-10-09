import { Toaster } from 'react-hot-toast';
import styles from './ToastContainer.module.scss';

const ToastContainer = () => <Toaster position="top-right" reverseOrder={false} containerClassName={styles.toaster} />;

export default ToastContainer;