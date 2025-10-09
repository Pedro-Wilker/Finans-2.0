import { type Expense } from '../../utils/types';
import api from '../../services/api';
import toast from 'react-hot-toast';
import styles from './ExpenseList.module.css';

interface ExpenseListProps {
    expenses: Expense[];
    setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
    setEditingExpense?: React.Dispatch<React.SetStateAction<Expense | null>>;
}

const ExpenseList = ({ expenses, setExpenses, setEditingExpense }: ExpenseListProps) => {
    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/expenses/${id}`);
            setExpenses((prev) => prev.filter((expense) => expense.id !== id));
            toast.success('Despesa excluída com sucesso!');
        } catch (error) {
            toast.error('Erro ao excluir despesa');
        }
    };

    const handleEdit = (expense: Expense) => {
        setEditingExpense?.(expense);
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Lista de Despesas</h2>
            {expenses.length === 0 ? (
                <p className={styles.empty}>Nenhuma despesa encontrada.</p>
            ) : (
                <ul className={styles.list}>
                    {expenses.map((expense) => (
                        <li key={expense.id} className={styles.item}>
                            <p className={styles.description}>
                                <strong>{expense.description}</strong> - R${expense.amount.toFixed(2)}
                            </p>
                            <p>Data: {new Date(expense.date).toLocaleDateString('pt-BR')}</p>
                            <p>Categoria: {expense.category}</p>
                            <p>Tipo: {expense.type}</p>
                            <p>Recorrente: {expense.is_recurring ? 'Sim' : 'Não'}</p>
                            <div className={styles.actions}>
                                <button
                                    className={styles.editButton}
                                    onClick={() => handleEdit(expense)}
                                >
                                    Editar
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(expense.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExpenseList;