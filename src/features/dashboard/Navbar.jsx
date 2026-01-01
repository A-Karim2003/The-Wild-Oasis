import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-18 w-full bg border border-red-500">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
        <span className="text-gold">Abdoul Karim</span>
        <User2 className="w-6 h-6 text-[var(--gold-accent)]" />
      </div>
    </header>
  );
}
