import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { expenseSchema } from '../../utils/validators';
import api from '../../services/api';
import toast from 'react-hot-toast';
import type { Expense } from '../../utils/types';
import styles from './styles/ExpenseForm.module.css';

interface ExpenseFormProps {
    setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

interface ExpenseFormData {
    description: string;
    amount: number;
    date: string;
    category: "food" | "transport" | "housing" | "entertainment" | "health" | "other";
    type: "academia" | "alimentacao_basica" | "passagens" | "besteiras" | "lazer" | "hobbie" | "educacao" | "saude" | "vestuario" | "moradia" | "transporte" | "investimentos" | "outros";
    is_recurring: boolean;
    currency: string;
}

const ExpenseForm = ({ setExpenses }: ExpenseFormProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ExpenseFormData>({
        resolver: yupResolver(expenseSchema),
    });

    const onSubmit = async (data: ExpenseFormData) => {
        try {
            const response = await api.post('/expenses', data);
            setExpenses((prev) => [...prev, response.data]);
            toast.success('Despesa adicionada com sucesso!');
            reset();
        } catch (error) {
            toast.error('Erro ao adicionar despesa');
        }
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Adicionar Despesa</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Descrição</label>
                    <input {...register('description')} className={styles.input} />
                    {errors.description && <p className={styles.error}>{errors.description.message}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Valor</label>
                    <input type="number" step="0.01" {...register('amount')} className={styles.input} />
                    {errors.amount && <p className={styles.error}>{errors.amount.message}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Data</label>
                    <input type="date" {...register('date')} className={styles.input} />
                    {errors.date && <p className={styles.error}>{errors.date.message}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Categoria</label>
                    <select {...register('category')} className={styles.select}>
                        <option value="food">Comida</option>
                        <option value="transport">Transporte</option>
                        <option value="housing">Moradia</option>
                        <option value="entertainment">Entretenimento</option>
                        <option value="health">Saúde</option>
                        <option value="other">Outro</option>
                    </select>
                    {errors.category && <p className={styles.error}>{errors.category.message}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Tipo</label>
                    <select {...register('type')} className={styles.select}>
                        <option value="academia">Academia</option>
                        <option value="alimentacao_basica">Alimentação Básica</option>
                        <option value="passagens">Passagens</option>
                        <option value="besteiras">Besteiras</option>
                        <option value="lazer">Lazer</option>
                        <option value="hobbie">Hobbie</option>
                        <option value="educacao">Educação</option>
                        <option value="saude">Saúde</option>
                        <option value="vestuario">Vestuário</option>
                        <option value="moradia">Moradia</option>
                        <option value="transporte">Transporte</option>
                        <option value="investimentos">Investimentos</option>
                        <option value="outros">Outros</option>
                    </select>
                    {errors.type && <p className={styles.error}>{errors.type.message}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Recorrente</label>
                    <input type="checkbox" {...register('is_recurring')} className={styles.checkbox} />
                    {errors.is_recurring && <p className={styles.error}>{errors.is_recurring.message}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Moeda</label>
                    <input {...register('currency')} className={styles.input} defaultValue="BRL" />
                    {errors.currency && <p className={styles.error}>{errors.currency.message}</p>}
                </div>
                <button type="submit" className={styles.submitButton}>Adicionar</button>
            </form>
        </div>
    );
};

export default ExpenseForm;
