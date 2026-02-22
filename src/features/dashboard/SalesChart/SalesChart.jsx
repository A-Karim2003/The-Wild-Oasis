import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useSearchParams } from "react-router";

export const description = "An area chart with a legend";

const chartConfig = {
  total_sales: {
    label: "Total Sales",
    color: "var(--gold-dark)",
  },
  extra_sales: {
    label: "Extra Sales",
    color: "var(--gold-bright)",
  },
};

export function SalesChart({ bookings }) {
  const [searchParam] = useSearchParams();
  const lastNumOfDays = parseInt(searchParam.get("last")) || 7;

  //* Generates an array of every single date between two dates.
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), lastNumOfDays - 1),
    end: new Date(),
  });

  const chartData = allDates.map((date) => ({
    label: format(date, "MMM dd"),

    //* Sum all booking sales for that given date
    total_sales: bookings
      .filter((booking) => isSameDay(date, new Date(booking.start_date)))
      .reduce((acc, cur) => acc + cur.cabin_price + cur.extras_price, 0),

    extra_sales: bookings
      .filter((booking) => isSameDay(date, new Date(booking.start_date)))
      .reduce((acc, cur) => acc + cur.extras_price, 0),
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          Sales from{" "}
          {format(subDays(new Date(), lastNumOfDays - 1), "MMM dd yyyy")} —{" "}
          {format(new Date(), "MMM dd yyyy")}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis dataKey="label" tickLine={true} tickMargin={8} />

            <YAxis dataKey="total_sales" tickLine={true} tickMargin={8} />

            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />

            <Area
              dataKey="total_sales"
              type="natural"
              fill="var(--color-total_sales)"
              fillOpacity={0.4}
              stroke="var(--color-total_sales)"
            />
            <Area
              dataKey="extra_sales"
              type="natural"
              fill="var(--color-extra_sales)"
              fillOpacity={0.4}
              stroke="var(--color-extra_sales)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
