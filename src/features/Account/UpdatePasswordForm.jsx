import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { KeyRound, X } from "lucide-react";

export default function UpdatePasswordForm() {
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
        <form className="flex flex-col gap-5">
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
            <Input
              id="newPassword"
              type="password"
              placeholder="••••••••"
              className="bg-input/50"
            />
          </div>

          <Separator className="opacity-40" />

          <div className="grid grid-cols-[200px_1fr] items-center gap-4">
            <Label
              htmlFor="confirmPassword"
              className="text-sm text-muted-foreground"
            >
              Confirm password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="bg-input/50"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-border text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Update password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
