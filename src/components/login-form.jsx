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

export function LoginForm({ className, ...props }) {
  const { resolvedTheme } = useTheme();
  const { mutate: login } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "demo@example.com",
      password: "demo123",
    },
  });

  function onSubmit(data) {
    console.log(data);
    login(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex justify-center">
        {resolvedTheme === "light" && <img src={logoLight} width={140} />}
        {resolvedTheme === "dark" && <img src={logoDark} width={140} />}
      </div>
      <Card>
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
              <Button type="submit">Login</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
