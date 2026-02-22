"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An area chart with a legend";

const chartData = [
  { label: "Jan 09", total_sales: 4200, extra_sales: 450 },
  { label: "Jan 11", total_sales: 7700, extra_sales: 0 },
  { label: "Jan 14", total_sales: 2500, extra_sales: 300 },
  { label: "Jan 17", total_sales: 5400, extra_sales: 720 },
  { label: "Jan 20", total_sales: 1750, extra_sales: 105 },
  { label: "Jan 22", total_sales: 3000, extra_sales: 0 },
  { label: "Jan 25", total_sales: 4875, extra_sales: 450 },
  { label: "Jan 27", total_sales: 1800, extra_sales: 300 },
  { label: "Jan 29", total_sales: 2800, extra_sales: 180 },
  { label: "Feb 01", total_sales: 5200, extra_sales: 0 },
  { label: "Feb 03", total_sales: 2370, extra_sales: 120 },
  { label: "Feb 05", total_sales: 4900, extra_sales: 420 },
  { label: "Feb 07", total_sales: 1500, extra_sales: 300 },
  { label: "Feb 10", total_sales: 6050, extra_sales: 675 },
  { label: "Feb 12", total_sales: 3450, extra_sales: 525 },
  { label: "Feb 14", total_sales: 900, extra_sales: 180 },
  { label: "Feb 16", total_sales: 7750, extra_sales: 750 },
  { label: "Feb 18", total_sales: 2250, extra_sales: 300 },
  { label: "Feb 20", total_sales: 4200, extra_sales: 0 },
  { label: "Feb 21", total_sales: 5975, extra_sales: 975 },
];

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

export function SalesChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Sales from May 25 2023 — May 31 2023</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
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
