import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { expenseSchema } from '../../utils/validators';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { type Expense } from '../../utils/types';
import styles from './styles/ExpenseForm.module.scss';
import { useEffect } from 'react';

interface ExpenseFormProps {
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  editingExpense?: Expense | null;
  setEditingExpense?: React.Dispatch<React.SetStateAction<Expense | null>>;
}

interface ExpenseFormData {
  description: string;
  amount: number;
  date: string;
  category: 'food' | 'transport' | 'housing' | 'entertainment' | 'health' | 'other';
  type: string;
  is_recurring: boolean;
  currency: string;
}

const ExpenseForm = ({ setExpenses, editingExpense, setEditingExpense }: ExpenseFormProps) => {
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<ExpenseFormData>({
    resolver: yupResolver(expenseSchema),
  });

  useEffect(() => {
    if (editingExpense) {
      setValue('description', editingExpense.description);
      setValue('amount', editingExpense.amount);
      setValue('date', editingExpense.date);
      setValue('category', editingExpense.category);
      setValue('type', editingExpense.type);
      setValue('is_recurring', editingExpense.is_recurring);
      setValue('currency', editingExpense.currency);
    }
  }, [editingExpense, setValue]);

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      if (editingExpense) {
        const response = await api.patch(`/expenses/${editingExpense.id}`, data);
        setExpenses((prev) => prev.map((exp) => (exp.id === editingExpense.id ? response.data : exp)));
        toast.success('Despesa atualizada com sucesso!');
        setEditingExpense?.(null);
      } else {
        const response = await api.post('/expenses', data);
        setExpenses((prev) => [...prev, response.data]);
        toast.success('Despesa adicionada com sucesso!');
      }
      reset();
    } catch (error) {
      toast.error(editingExpense ? 'Erro ao atualizar despesa' : 'Erro ao adicionar despesa');
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{editingExpense ? 'Editar Despesa' : 'Adicionar Despesa'}</h2>
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
        <div className={styles.actions}>
          <button type="submit" className={styles.submitButton}>
            {editingExpense ? 'Atualizar' : 'Adicionar'}
          </button>
          {editingExpense && (
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => {
                reset();
                setEditingExpense?.(null);
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;