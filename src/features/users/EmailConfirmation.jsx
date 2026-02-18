import { Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  { label: "Open the email from", highlight: "noreply@mail.app.supabase.io" },
  { label: "Click", highlight: '"Confirm my email"' },
  { label: "You'll be signed in automatically", highlight: null },
];

export default function EmailConfirmationUI() {
  return (
    <Card className="w-full max-w-210 bg-card border-border/60 shadow-2xl">
      <CardHeader className="items-center text-center gap-3 pb-4">
        <div className="w-16 h-16 rounded-xl bg-primary/15 flex items-center justify-center mb-1">
          <Mail className="w-7 h-7 text-primary" strokeWidth={1.8} />
        </div>

        <CardTitle className="text-xl font-semibold">
          Check your email
        </CardTitle>

        <CardDescription className="text-sm leading-relaxed">
          We sent a confirmation link to
        </CardDescription>

        <Badge
          variant="outline"
          className="text-primary border-primary/30 bg-primary/10 font-medium px-3 py-1 text-xs rounded-full"
        >
          you@example.com
        </Badge>

        <CardDescription className="text-sm leading-relaxed">
          Click the link to confirm your address and activate your account. It
          expires in{" "}
          <span className="text-foreground font-medium">24 hours</span>.
        </CardDescription>
      </CardHeader>

      <hr className="opacity-60" />

      <CardContent className="pt-5 pb-2">
        <ol className="flex flex-col gap-3">
          {steps.map((step, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <span className="shrink-0 w-5.5 h-5.5 rounded-full bg-primary/15 text-primary text-[11px] font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-muted-foreground">
                {step.label}{" "}
                {step.highlight && (
                  <span className="text-foreground font-medium">
                    {step.highlight}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
