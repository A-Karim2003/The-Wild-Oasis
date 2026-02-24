import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <main className="relative flex h-screen w-screen items-center justify-center overflow-hidden px-4">
      {/* Gold glow background */}
      <div className="pointer-events-none absolute inset-0 bg-gold-glow opacity-70 dark:opacity-100" />

      <Card className="relative z-10 w-full max-w-2xl rounded-3xl border-border/40 bg-card/90 backdrop-blur-xl shadow-[0_0_60px_-15px_var(--color-gold)]">
        <CardHeader className="flex flex-col items-center gap-6 text-center">
          {/* Decorative ring */}
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-gold-dark shadow-[0_0_40px_oklch(0.65_0.14_75/.3),inset_0_0_40px_oklch(0.65_0.14_75/.1)]">
            <span className="text-5xl font-bold text-gold-bright">!</span>
          </div>

          <CardTitle className="text-3xl font-semibold text-gold">
            Something went wrong
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-sm leading-relaxed text-gold-accent">
            An unexpected error occurred. Please try refreshing the page or
            navigating back.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center gap-4">
          <Button
            onClick={() => window.location.reload()}
            className="rounded-xl bg-gold text-black hover:bg-gold-bright"
          >
            Refresh page
          </Button>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="rounded-xl border-gold-dark text-gold hover:bg-gold/10"
          >
            Go back
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
