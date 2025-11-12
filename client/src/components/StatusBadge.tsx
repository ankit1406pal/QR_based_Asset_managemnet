import { Badge } from "@/components/ui/badge";

type BuybackStatus = "Pending" | "Approved" | "In Process" | "Completed";

interface StatusBadgeProps {
  status: BuybackStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getVariant = () => {
    switch (status) {
      case "Pending":
        return "secondary" as const;
      case "Approved":
        return "default" as const;
      case "In Process":
        return "outline" as const;
      case "Completed":
        return "default" as const;
      default:
        return "secondary" as const;
    }
  };

  const getClassName = () => {
    switch (status) {
      case "Pending":
        return "bg-muted text-muted-foreground";
      case "Approved":
        return "bg-primary text-primary-foreground";
      case "In Process":
        return "border-primary text-primary";
      case "Completed":
        return "bg-chart-5 text-white";
      default:
        return "";
    }
  };

  return (
    <Badge variant={getVariant()} className={getClassName()} data-testid={`badge-status-${status.toLowerCase().replace(" ", "-")}`}>
      {status}
    </Badge>
  );
}
