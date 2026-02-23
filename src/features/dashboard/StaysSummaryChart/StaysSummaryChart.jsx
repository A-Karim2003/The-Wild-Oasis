import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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

const chartInitialData = [
  { duration: "1 night", value: 0, fill: "var(--gold-bright)" },
  { duration: "2 nights", value: 0, fill: "var(--gold)" },
  { duration: "3 nights", value: 0, fill: "var(--gold-light)" },
  { duration: "4-5 nights", value: 0, fill: "var(--gold-dark)" },
  { duration: "6-7 nights", value: 0, fill: "var(--gold-accent)" },
  { duration: "8-14 nights", value: 0, fill: "var(--gold-bright)" },
  { duration: "15-21 nights", value: 0, fill: "var(--gold-dark)" },
  { duration: "21+ nights", value: 0, fill: "var(--gold-accent)" },
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

export function StaysSummaryChart({ confirmedStays }) {
  const totalVisitors = React.useMemo(() => {
    return chartInitialData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  console.log(confirmedStays);

  function prepareData(chartInitialData, stays) {
    function incArrayValue(arr, field) {
      return arr.map((obj) =>
        obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
      );
    }

    const data = stays
      .reduce((arr, cur) => {
        const num = cur.numNights;
        if (num === 1) return incArrayValue(arr, "1 night");
        if (num === 2) return incArrayValue(arr, "2 nights");
        if (num === 3) return incArrayValue(arr, "3 nights");
        if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
        if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
        if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
        if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
        if (num >= 21) return incArrayValue(arr, "21+ nights");
        return arr;
      }, chartInitialData)
      .filter((obj) => obj.value > 0);

    return data;
  }

  return (
    <Card className="flex flex-col h-full border-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stay duration summary</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5 "
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartInitialData}
              dataKey="value"
              nameKey="duration"
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
                          nights
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
          <ChartLegend
            content={<ChartLegendContent nameKey="duration" />}
            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
          />
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
