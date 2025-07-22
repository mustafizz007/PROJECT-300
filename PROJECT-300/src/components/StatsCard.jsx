import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { cn } from "../utils/cn";

export function StatsCard({
  title,
  value,
  change,
  changeType,
  iconSrc,
  iconAlt,
}) {
  return (
    <Card className="bg-gray-900 text-white border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold">{value}</div>
          <img
            src={iconSrc || "/placeholder.svg"}
            alt={iconAlt}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <p
          className={cn(
            "text-xs",
            changeType === "positive" ? "text-green-500" : "text-red-500"
          )}
        >
          {change}
        </p>
      </CardContent>
    </Card>
  );
}
