import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-18 w-full border  flex justify-end">
      <div className="flex items-center gap-6 px-8">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <span>Abdoul Karim</span>
        </div>

        <div className="flex items-center gap-3">
          <User2 className="w-6 h-6 text-gold-dark" />
          <ThemeToggle />
          <LogOut />
        </div>
      </div>
    </header>
  );
}
