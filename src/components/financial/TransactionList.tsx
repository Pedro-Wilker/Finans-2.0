import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <Card className="shadow-card border bg-gradient-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:bg-accent/50",
              "animate-slide-up"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="font-medium text-sm">{transaction.description}</div>
                <Badge 
                  variant="secondary" 
                  className="text-xs"
                >
                  {transaction.category}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {formatDate(transaction.date)}
              </div>
            </div>
            <div className={cn(
              "font-semibold text-sm",
              transaction.type === "income" ? "text-success" : "text-error"
            )}>
              {transaction.type === "income" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};