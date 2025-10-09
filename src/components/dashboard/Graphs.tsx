import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import api from '../../services/api';
import { type Expense } from '../../utils/types';
import styles from './styles/Graphs.module.scss';

const COLORS = ['#4c6cff', '#22c55e', '#ef4444', '#f97316', '#eab308', '#10b981'];

const Graphs = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, []);

  // Bar chart data: expenses by category
  const barData = [
    { name: 'Comida', value: expenses.filter((e) => e.category === 'food').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Transporte', value: expenses.filter((e) => e.category === 'transport').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Moradia', value: expenses.filter((e) => e.category === 'housing').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Entretenimento', value: expenses.filter((e) => e.category === 'entertainment').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Saúde', value: expenses.filter((e) => e.category === 'health').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Outro', value: expenses.filter((e) => e.category === 'other').reduce((sum, e) => sum + e.amount, 0) },
  ].filter((d) => d.value > 0);

  // Pie chart data: expenses by type
  const pieData = [
    { name: 'Academia', value: expenses.filter((e) => e.type === 'academia').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Alimentação', value: expenses.filter((e) => e.type === 'alimentacao_basica').reduce((sum, e) => sum + e.amount, 0) },
    { name: 'Lazer', value: expenses.filter((e) => e.type === 'lazer').reduce((sum, e) => sum + e.amount, 0) },
    // Add other types as needed
  ].filter((d) => d.value > 0);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Visão Geral das Despesas</h2>
      <div className={styles.chartWrapper}>
        <h3>Despesas por Categoria</h3>
        <BarChart width={600} height={300} data={barData} className={styles.chart}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4c6cff" />
        </BarChart>
      </div>
      <div className={styles.chartWrapper}>
        <h3>Despesas por Tipo</h3>
        <PieChart width={400} height={400} className={styles.chart}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default Graphs;