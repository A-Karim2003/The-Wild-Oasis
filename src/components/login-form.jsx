import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTheme } from "./context/ThemeProvider";
import logoLight from "@/data/img/logo-light.png";
import logoDark from "@/data/img/logo-dark.png";
import { useForm } from "react-hook-form";
import { useLogin } from "@/features/authentication/hooks/useLogin";
import { Spinner } from "./ui/spinner";

export function LoginForm({ className, ...props }) {
  const { resolvedTheme } = useTheme();
  const { mutate: login, isPending, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "demo@example.com",
      password: "demo123",
    },
  });

  function onSubmit(data) {
    login(data, {
      onSettled: () => {
        reset({ email: "", password: "" });
      },
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex justify-center mb-4">
        {resolvedTheme === "light" && <img src={logoLight} width={140} />}
        {resolvedTheme === "dark" && <img src={logoDark} width={140} />}
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-[oklch(0.75_0.12_85/0.35)] bg-[oklch(0.12_0.04_75/0.6)] px-3 py-2 text-sm text-[oklch(0.92_0.06_85)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.75_0.12_85)]" />
          <span className="text-red-500">
            {error.message || "Invalid email or password"}
          </span>
        </div>
      )}

      <Card className={"relative"}>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="demo@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password must required",
                  })}
                />
              </Field>

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
              <Button type="submit" disabled={isPending}>
                {isPending && <Spinner />}
                Login
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
