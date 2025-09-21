import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import type { Expense } from '../../utils/types';
import styles from './styles/Graphs.module.css';

interface GraphsProps {
    expenses: Expense[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Graphs = ({ expenses }: GraphsProps) => {
    const [view, setView] = useState<'daily' | 'monthly' | 'yearly'>('monthly');

    const groupByMonth = () => {
        const grouped = expenses.reduce((acc, expense) => {
            const month = new Date(expense.date).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
            acc[month] = (acc[month] || 0) + expense.amount;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(grouped).map(([name, amount]) => ({ name, amount }));
    };

    const groupByDay = () => {
        const grouped = expenses.reduce((acc, expense) => {
            const day = new Date(expense.date).toLocaleDateString('pt-BR');
            acc[day] = (acc[day] || 0) + expense.amount;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(grouped).map(([name, amount]) => ({ name, amount }));
    };

    const groupByYear = () => {
        const grouped = expenses.reduce((acc, expense) => {
            const year = new Date(expense.date).getFullYear().toString();
            acc[year] = (acc[year] || 0) + expense.amount;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(grouped).map(([name, amount]) => ({ name, amount }));
    };

    const groupByType = () => {
        const grouped = expenses.reduce((acc, expense) => {
            acc[expense.type] = (acc[expense.type] || 0) + expense.amount;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(grouped).map(([name, value]) => ({ name, value }));
    };

    const data = view === 'daily' ? groupByDay() : view === 'monthly' ? groupByMonth() : groupByYear();

    return (
        <div className={styles.card}>
            <div className={styles.tabs}>
                <button className={`${styles.tab} ${view === 'daily' ? styles.active : ''}`} onClick={() => setView('daily')}>
                    Diário
                </button>
                <button className={`${styles.tab} ${view === 'monthly' ? styles.active : ''}`} onClick={() => setView('monthly')}>
                    Mensal
                </button>
                <button className={`${styles.tab} ${view === 'yearly' ? styles.active : ''}`} onClick={() => setView('yearly')}>
                    Anual
                </button>
            </div>
            <h2 className={styles.title}>Gastos por {view === 'daily' ? 'Dia' : view === 'monthly' ? 'Mês' : 'Ano'}</h2>
            <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
            <h2 className={styles.title}>Distribuição por Tipo</h2>
            <PieChart width={500} height={300}>
                <Pie data={groupByType()} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                    {groupByType().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default Graphs;