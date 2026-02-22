import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function KPICard({ icon: Icon, title, value }) {
  return (
    <Card className={"border border-gold-accent h-full flex justify-center"}>
      <CardContent className="flex gap-4 items-center flex-wrap">
        <div className="size-12 rounded-xl bg-gold flex items-center justify-center">
          <Icon size={28} />
        </div>
        <div className="space-y-2">
          <h3 className="text-muted-foreground font-semibold text-sm text-nowrap">
            {title}
          </h3>
          <strong className="text-xl">{value}</strong>
        </div>
      </CardContent>
    </Card>
  );
}
