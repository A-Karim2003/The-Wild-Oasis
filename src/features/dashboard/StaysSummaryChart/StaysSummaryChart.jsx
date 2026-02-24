import { differenceInDays } from "date-fns";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
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
  value: { label: "Stays" },
  "1 night": { label: "1 night", color: "var(--gold-bright)" },
  "2 nights": { label: "2 nights", color: "var(--gold)" },
  "3 nights": { label: "3 nights", color: "var(--gold-light)" },
  "4-5 nights": { label: "4-5 nights", color: "var(--gold-dark)" },
  "6-7 nights": { label: "6-7 nights", color: "var(--gold-accent)" },
  "8-14 nights": { label: "8-14 nights", color: "var(--gold-bright)" },
  "15-21 nights": { label: "15-21 nights", color: "var(--gold-dark)" },
  "21+ nights": { label: "21+ nights", color: "var(--gold-accent)" },
};

function prepareData(chartInitialData, stays) {
  function incArrayValue(initialData, field) {
    return initialData.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  }

  return stays
    .reduce((initialData, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(initialData, "1 night");
      if (num === 2) return incArrayValue(initialData, "2 nights");
      if (num === 3) return incArrayValue(initialData, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(initialData, "4-5 nights");
      if ([6, 7].includes(num))
        return incArrayValue(initialData, "8-14 nights");
      if (num >= 15 && num <= 21)
        return incArrayValue(initialData, "15-21 nights");
      if (num >= 21) return incArrayValue(initialData, "21+ nights");
      return initialData;
    }, chartInitialData)
    .filter((obj) => obj.value > 0);
}

export function StaysSummaryChart({ confirmedStays }) {
  const staysWithNights = confirmedStays.map((stay) => ({
    ...stay,
    numNights: differenceInDays(
      new Date(stay.end_date),
      new Date(stay.start_date),
    ),
  }));

  const data = prepareData(chartInitialData, staysWithNights);

  const totalStays = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stay duration summary</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 min-h-0">
        <div className="flex h-full items-center gap-4">
          <ChartContainer
            config={chartConfig}
            className="aspect-square h-62.5 shrink-0"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
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
                            {totalStays}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            stays
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>

          <div className="flex flex-col gap-2 text-sm ">
            {data.map((entry) => (
              <div key={entry.duration} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 shrink-0 rounded-sm"
                  style={{ background: entry.fill }}
                />
                <span>{entry.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
