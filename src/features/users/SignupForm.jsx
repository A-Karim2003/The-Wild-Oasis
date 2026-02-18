import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignUp from "../authentication/hooks/useSignUp";
import { Spinner } from "@/components/ui/spinner";

export const formSchema = z
  .object({
    fullname: z
      .string()
      .trim()
      .nonempty("Full name is required")
      .min(2, { message: "Full name must be at least 2 characters" }),

    email: z
      .string()
      .trim()
      .nonempty("Email is required")
      .email({ message: "Enter a valid email address" }),

    password: z
      .string()
      .trim()
      .nonempty("Password is required")
      .min(8, { message: "Password must be at least 8 characters" }),

    confirmPassword: z.string().trim().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignupForm({ setShowEmailConfirm }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(formSchema) });

  const { mutate: signup, isPending } = useSignUp();

  function onSubmit(data) {
    signup(
      {
        email: data.email,
        password: data.password,
        fullname: data.fullname,
      },

      {
        onSuccess: (data) => {
          console.log(data);

          reset();
          // Only show email confirmation if NO session returned
          if (!data.session) {
            setShowEmailConfirm(true);
          }
        },
      },
    );
  }

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
          {errors.password && (
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
            disabled={isSubmitting || isPending}
            className={"bg-gold-dark"}
          >
            {isPending && (
              <>
                <Spinner />
                Creating new user
              </>
            )}

            {!isPending && " Create new user"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
