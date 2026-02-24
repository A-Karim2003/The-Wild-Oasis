import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ErrorPage() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <Card className="flex flex-col items-center text-center max-w-md w-full">
        <CardHeader className="items-center gap-4">
          {/* Decorative ring */}
          <div
            className="h-32 w-32 rounded-full flex items-center justify-center"
            style={{
              border: "2px solid var(--gold-dark)",
              boxShadow:
                "0 0 40px oklch(0.65 0.14 75 / 0.3), inset 0 0 40px oklch(0.65 0.14 75 / 0.1)",
            }}
          >
            <span
              className="text-5xl font-bold"
              style={{ color: "var(--gold-bright)" }}
            >
              !
            </span>
          </div>

          <CardTitle className="text-3xl" style={{ color: "var(--gold)" }}>
            Something went wrong
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--gold-accent)" }}
          >
            An unexpected error occurred. Please try refreshing the page or
            navigating back.
          </p>
        </CardContent>

        <CardFooter className="flex gap-4">
          <Button
            onClick={() => window.location.reload()}
            style={{ background: "var(--gold)", color: "oklch(0 0 0)" }}
            className="hover:opacity-90"
          >
            Refresh Page
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            style={{ borderColor: "var(--gold-dark)", color: "var(--gold)" }}
            className="hover:opacity-90 bg-transparent"
          >
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
