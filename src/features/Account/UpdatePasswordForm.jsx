import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { KeyRound, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useUpdateAccount from "./hooks/useUpdateAccount";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .nonempty("Password is required")
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().trim().nonempty("Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(formSchema) });

  const { mutate: updateAccount, isPending } = useUpdateAccount();

  function onSubmit(data) {
    updateAccount({ password: data.newPassword });
    reset();
  }

  return (
    <Card className="bg-card border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-primary" />
          Update password
        </CardTitle>
      </CardHeader>

      <Separator className="opacity-60" />

      <CardContent className="pt-6">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <Label
              htmlFor="newPassword"
              className="text-sm text-muted-foreground"
            >
              New password
              <span className="block text-xs text-muted-foreground/60 font-normal">
                min. 8 characters
              </span>
            </Label>
            <div className="flex flex-col gap-1">
              <Input
                id="newPassword"
                type="password"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
          </div>

          <Separator className="opacity-40" />

          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <Label
              htmlFor="confirmPassword"
              className="text-sm text-muted-foreground"
            >
              Confirm password
            </Label>
            <div className="flex flex-col gap-1">
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
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-border text-muted-foreground hover:text-foreground"
              onClick={() => reset()}
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isSubmitting}>
              {isPending && <Spinner />}
              Update password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
