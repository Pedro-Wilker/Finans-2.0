import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

export const registerSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  profile_photo: yup.mixed().optional().nullable(),
  phone: yup.string().nullable().optional(),
  profession: yup.string().nullable().optional(),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
});

export const resetPasswordSchema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  code: yup.string().required('Código é obrigatório'),
  newPassword: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Nova senha é obrigatória'),
});


export const expenseSchema = yup.object({
  description: yup.string().required('Descrição é obrigatória'),
  amount: yup.number().positive('Valor deve ser positivo').required('Valor é obrigatório'),
  date: yup.string().required('Data é obrigatória'),
  category: yup.string().oneOf(['food', 'transport', 'housing', 'entertainment', 'health', 'other']).default('other'),
  type: yup.string().oneOf(['academia', 'alimentacao_basica', 'passagens', 'besteiras', 'lazer', 'hobbie', 'educacao', 'saude', 'vestuario', 'moradia', 'transporte', 'investimentos', 'outros']).required('Tipo é obrigatório'),
  is_recurring: yup.boolean().required('Recorrência é obrigatória'),
  currency: yup.string().required('Moeda é obrigatória'),
});