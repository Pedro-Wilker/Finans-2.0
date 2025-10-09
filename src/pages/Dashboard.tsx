import { useEffect, useState } from 'react';
   import api from '../services/api';
   import Header from '../components/common/Header';
   import Footer from '../components/common/Footer';
   import ExpenseForm from '../components/dashboard/ExpenseForm';
   import ExpenseList from '../components/dashboard/ExpenseList';
   import Graphs from '../components/dashboard/Graphs';
   import Profile from '../components/dashboard/Profile';
   import type { Expense } from '../utils/types';
   import toast from 'react-hot-toast';
   import styles from './Dashboard.module.css';

   const Dashboard = () => {
     const [expenses, setExpenses] = useState<Expense[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       const fetchExpenses = async () => {
         try {
           const response = await api.get('/expenses');
           setExpenses(response.data);
         } catch (error) {
           toast.error('Erro ao carregar despesas');
         } finally {
           setLoading(false);
         }
       };
       fetchExpenses();
     }, []);

     const handleReport = async () => {
       try {
         await api.post('/report');
         toast.success('Relatório solicitado com sucesso!');
       } catch (error) {
         toast.error('Erro ao solicitar relatório');
       }
     };

     return (
       <div className={styles.container}>
         <Header />
         <main className={styles.main}>
           <h1 className={styles.title}>Dashboard Financeiro</h1>
           <button className={styles.reportButton} onClick={handleReport}>
             Enviar Relatório Mensal
           </button>
           {loading ? (
             <p className={styles.loading}>Loading...</p>
           ) : (
             <div className={styles.grid}>
               <div>
                 <ExpenseForm setExpenses={setExpenses} />
                 <ExpenseList expenses={expenses} setExpenses={setExpenses} />
               </div>
               <div>
                 <Graphs expenses={expenses} />
                 <Profile />
               </div>
             </div>
           )}
         </main>
         <Footer />
       </div>
     );
   };

   export default Dashboard;