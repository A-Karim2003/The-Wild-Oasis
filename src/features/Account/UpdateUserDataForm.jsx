import { UserCircle, Upload, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useUser from "../authentication/hooks/useUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  fullname: z
    .string()
    .trim()
    .nonempty("Full name is required")
    .min(2, { message: "Full name must be at least 2 characters" }),
  avatar: z.any().optional(),
});

export default function UpdateUserDataForm() {
  const { data: user } = useUser();

  const {
    email,
    user_metadata: { fullname },
  } = user;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { fullname },
  });

  const avatarFile = watch("avatar");
  const selectedFileName = avatarFile?.[0]?.name;

  function onSubmit(data) {
    console.log({
      fullname: data.fullname,
      avatar: data.avatar?.[0] ?? null,
    });
  }

  return (
    <Card className="bg-card border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <UserCircle className="w-4 h-4 text-primary" />
          Update user data
        </CardTitle>
      </CardHeader>

      <Separator className="opacity-60" />

      <CardContent className="pt-6">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <Label className="text-sm text-muted-foreground">
              Email address
            </Label>
            <Input
              type="email"
              defaultValue={email}
              disabled
              className="bg-input/50 text-muted-foreground cursor-not-allowed"
            />
          </div>

          <Separator className="opacity-40" />

          {/* Full name */}
          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <Label htmlFor="fullname" className="text-sm text-muted-foreground">
              Full name
            </Label>
            <div className="flex flex-col gap-1">
              <Input
                id="fullname"
                type="text"
                placeholder="Your full name"
                {...register("fullname")}
              />
              {errors.fullname && (
                <p className="text-sm text-red-500">
                  {errors.fullname.message}
                </p>
              )}
            </div>
          </div>

          <Separator className="opacity-40" />

          {/* Avatar */}
          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <Label className="text-sm text-muted-foreground">
              Avatar image
            </Label>
            <div className="flex items-center gap-3">
              <Label
                htmlFor="avatar"
                className="cursor-pointer flex items-center gap-1.5 text-sm border border-primary/40 text-primary hover:bg-primary/10 rounded-md px-3 py-1.5 shrink-0"
              >
                <Upload className="w-3.5 h-3.5" />
                Choose file
              </Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("avatar")}
              />
              <span className="text-xs text-muted-foreground truncate">
                {selectedFileName || "No file chosen"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-border text-muted-foreground hover:text-foreground"
              onClick={() => reset({ fullname })}
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isSubmitting}>
              Update account
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
