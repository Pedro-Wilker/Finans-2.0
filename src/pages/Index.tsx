import { FinancialCard } from "@/components/financial/FinancialCard";
import { TransactionList } from "@/components/financial/TransactionList";
import { ExpenseChart } from "@/components/financial/ExpenseChart";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank,
  Menu,
  Settings,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Mock data - em uma aplicação real, estes dados viriam de uma API
  const mockTransactions = [
    {
      id: "1",
      description: "Salário",
      amount: 5000,
      category: "Renda",
      date: "2024-01-15",
      type: "income" as const,
    },
    {
      id: "2", 
      description: "Supermercado",
      amount: 250,
      category: "Alimentação",
      date: "2024-01-14",
      type: "expense" as const,
    },
    {
      id: "3",
      description: "Gasolina",
      amount: 120,
      category: "Transporte", 
      date: "2024-01-13",
      type: "expense" as const,
    },
    {
      id: "4",
      description: "Freelance",
      amount: 800,
      category: "Renda Extra",
      date: "2024-01-12",
      type: "income" as const,
    },
    {
      id: "5",
      description: "Netflix",
      amount: 45,
      category: "Entretenimento",
      date: "2024-01-11",
      type: "expense" as const,
    },
  ];

  const expenseData = [
    { name: "Alimentação", value: 1200, color: "hsl(0, 84%, 60%)" },
    { name: "Transporte", value: 800, color: "hsl(48, 96%, 53%)" },
    { name: "Entretenimento", value: 300, color: "hsl(214, 76%, 19%)" },
    { name: "Saúde", value: 450, color: "hsl(142, 76%, 36%)" },
    { name: "Educação", value: 200, color: "hsl(240, 5%, 64%)" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Wallet className="h-4 w-4 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold">FinanceApp</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Olá, João! 👋</h2>
            <p className="text-muted-foreground">
              Aqui está um resumo das suas finanças hoje.
            </p>
          </div>

          {/* Financial Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FinancialCard
              title="Saldo Total"
              value="R$ 12.450,00"
              change="+2.1% este mês"
              icon={Wallet}
              type="balance"
            />
            <FinancialCard
              title="Receitas"
              value="R$ 5.800,00"
              change="+12% este mês"
              icon={TrendingUp}
              type="income"
            />
            <FinancialCard
              title="Despesas"
              value="R$ 2.950,00"
              change="-8% este mês"
              icon={TrendingDown}
              type="expense"
            />
            <FinancialCard
              title="Economia"
              value="R$ 2.850,00"
              change="Meta: R$ 3.000"
              icon={PiggyBank}
              type="default"
            />
          </div>

          {/* Charts and Transactions */}
          <div className="grid gap-6 lg:grid-cols-2">
            <ExpenseChart data={expenseData} />
            <TransactionList transactions={mockTransactions} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;