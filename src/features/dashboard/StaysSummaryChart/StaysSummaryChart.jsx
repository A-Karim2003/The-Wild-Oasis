"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { duration: "1 night", value: 0, color: "var(--gold-bright)" },
  { duration: "2 nights", value: 0, color: "var(--gold)" },
  { duration: "3 nights", value: 0, color: "var(--gold-light)" },
  { duration: "4-5 nights", value: 0, color: "var(--gold-dark)" },
  { duration: "6-7 nights", value: 0, color: "var(--gold-accent)" },
  { duration: "8-14 nights", value: 0, color: "var(--gold-bright)" },
  { duration: "15-21 nights", value: 0, color: "var(--gold-dark)" },
  { duration: "21+ nights", value: 0, color: "var(--gold-accent)" },
];

const chartConfig = {
  value: {
    label: "Nights",
  },
  "1 night": {
    label: "1 night",
    color: "var(--gold-bright)",
  },
  "2 nights": {
    label: "2 nights",
    color: "var(--gold)",
  },
  "3 nights": {
    label: "3 nights",
    color: "var(--gold-light)",
  },
  "4-5 nights": {
    label: "4-5 nights",
    color: "var(--gold-dark)",
  },
  "6-7 nights": {
    label: "6-7 nights",
    color: "var(--gold-accent)",
  },
  "8-14 nights": {
    label: "8-14 nights",
    color: "var(--gold-bright)",
  },
  "15-21 nights": {
    label: "15-21 nights",
    color: "var(--gold-dark)",
  },
  "21+ nights": {
    label: "21+ nights",
    color: "var(--gold-accent)",
  },
};

export function StaysSummaryChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
