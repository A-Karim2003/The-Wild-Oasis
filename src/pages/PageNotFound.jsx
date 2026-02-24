import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Gold glow background */}
      <div className="pointer-events-none absolute inset-0 bg-gold-glow dark:opacity-100 opacity-70" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <Card className="max-w-xl w-full rounded-3xl border-border/40 bg-card/90 backdrop-blur-xl shadow-[0_0_60px_-15px_var(--color-gold)]">
          <CardContent className="flex flex-col items-center gap-6 py-14 text-center">
            <span className="text-8xl font-bold tracking-tight text-gold-bright">
              404
            </span>

            {/* Title */}
            <h1 className="text-2xl font-semibold">Page not found</h1>

            {/* Description */}
            <p className="max-w-md text-sm text-muted-foreground">
              The page you're trying to access doesn't exist or has been moved.
              Check the URL or return to the dashboard.
            </p>

            {/* Actions */}
            <div className="mt-4 flex gap-4">
              <Button
                asChild
                className="rounded-xl bg-gold text-black hover:bg-gold-bright"
              >
                <Link to="/">Back to dashboard</Link>
              </Button>

              <Button
                variant="outline"
                className="rounded-xl border-gold/40 text-gold hover:bg-gold/10"
                onClick={() => navigate(-1)}
              >
                Go back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
