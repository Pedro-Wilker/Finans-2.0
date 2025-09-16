import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinancialCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  type?: "income" | "expense" | "balance" | "default";
  className?: string;
}

export const FinancialCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  type = "default",
  className 
}: FinancialCardProps) => {
  const getCardStyles = () => {
    switch (type) {
      case "income":
        return "border-success/20 bg-gradient-to-br from-success/5 to-success/10";
      case "expense":
        return "border-error/20 bg-gradient-to-br from-error/5 to-error/10";
      case "balance":
        return "border-primary/20 bg-gradient-primary";
      default:
        return "border-border bg-gradient-card";
    }
  };

  const getIconStyles = () => {
    switch (type) {
      case "income":
        return "text-success bg-success/10";
      case "expense":
        return "text-error bg-error/10";
      case "balance":
        return "text-primary-foreground bg-primary-foreground/10";
      default:
        return "text-primary bg-primary/10";
    }
  };

  const getValueStyles = () => {
    switch (type) {
      case "income":
        return "text-success";
      case "expense":
        return "text-error";
      case "balance":
        return "text-primary-foreground";
      default:
        return "text-foreground";
    }
  };

  return (
    <Card className={cn(
      "shadow-card hover:shadow-elevated transition-all duration-300 border animate-fade-in",
      getCardStyles(),
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          "text-sm font-medium",
          type === "balance" ? "text-primary-foreground/80" : "text-muted-foreground"
        )}>
          {title}
        </CardTitle>
        <div className={cn(
          "h-8 w-8 rounded-lg flex items-center justify-center",
          getIconStyles()
        )}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", getValueStyles())}>
          {value}
        </div>
        {change && (
          <p className={cn(
            "text-xs mt-1",
            type === "balance" ? "text-primary-foreground/60" : "text-muted-foreground"
          )}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};