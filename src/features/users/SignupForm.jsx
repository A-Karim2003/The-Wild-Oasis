import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const formSchema = z
  .object({
    fullname: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters"),
    email: z.email("Enter a valid email address").min(1, "Email is required"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(formSchema) });

  function onSubmit(data) {
    console.log(data);
  }

  console.log(errors);

  return (
    <Card className="p-4">
      <form
        id="cabin-form"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <FieldLabel htmlFor="fullname">Full name</FieldLabel>
          <Input id="fullname" type="text" {...register("fullname")} />
          {errors.fullname && (
            <p className="text-sm text-red-500">{errors.fullname.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email address</FieldLabel>
          <Input id="email" type="email" {...register("email")} />
          {errors.fullname && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" {...register("password")} />
          {errors.fullname && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </Field>

        <div className="flex items-center gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={"bg-gold-dark"}
          >
            Create new user
          </Button>
        </div>
      </form>
    </Card>
  );
}
