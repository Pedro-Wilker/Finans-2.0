export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profession?: string;
  profile_photo?: string;
}

export interface Expense {
  id: string;
  user_id: string;
  description: string;
  amount: number;
  date: string;
  category: 'food' | 'transport' | 'housing' | 'entertainment' | 'health' | 'other';
  type: 'academia' | 'alimentacao_basica' | 'passagens' | 'besteiras' | 'lazer' | 'hobbie' | 'educacao' | 'saude' | 'vestuario' | 'moradia' | 'transporte' | 'investimentos' | 'outros';
  is_recurring: boolean;
  currency: string;
  created_at: string;
  updated_at: string;
}