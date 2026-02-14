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
import { useState } from "react";

export function LoginForm({ className, ...props }) {
  const { resolvedTheme } = useTheme();
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("demo123");
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
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Field>
              <Button type="submit">Login</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
